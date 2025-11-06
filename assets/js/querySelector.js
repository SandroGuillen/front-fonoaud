const $ = (function () {
  const eventHandlers = {};

  function simulateSelector(selector) {
    return {
      on: function (event, childSelector, handler) {
        if (!eventHandlers[selector]) eventHandlers[selector] = {};
        if (!eventHandlers[selector][event])
          eventHandlers[selector][event] = [];
        eventHandlers[selector][event].push({ childSelector, handler });
      },
      click: function (handler) {
        this.on("click", null, handler);
      },
      keyup: function (handler) {
        this.on("keyup", null, handler);
      },
      change: function (handler) {
        this.on("change", null, handler);
      },
      val: function () {
        return simulateSelector.dataStore[selector] || "";
      },
      setVal: function (value) {
        simulateSelector.dataStore[selector] = value;
      },
      data: function (key) {
        return simulateSelector.dataAttrs?.[selector]?.[key];
      },
      setData: function (key, value) {
        if (!simulateSelector.dataAttrs) simulateSelector.dataAttrs = {};
        if (!simulateSelector.dataAttrs[selector])
          simulateSelector.dataAttrs[selector] = {};
        simulateSelector.dataAttrs[selector][key] = value;
      },
      trigger: function (event, ...args) {
        const handlers = eventHandlers[selector]?.[event];
        if (handlers) {
          handlers.forEach(({ handler }) => handler.apply(this, args));
        }
      },
    };
  }

  simulateSelector.dataStore = {}; // For storing input values

  simulateSelector.fn = {
    DataTable: function (config) {
      let data = config.data || [];
      const columns = config.columns || [];
      let filteredData = [...data];
      let searchTerm = "";
      const columnSearch = {};

      function applyFilters() {
        filteredData = data.filter((row) => {
          let matchesSearch = true;
          let matchesColumns = true;

          // General search
          if (searchTerm) {
            matchesSearch = columns.some((col) => {
              const val =
                typeof col.render === "function"
                  ? col.render(row[col.data], "display", row)
                  : row[col.data];

              return val
                ?.toString()
                .toLowerCase()
                .includes(searchTerm.toLowerCase());
            });
          }

          // Per-column search
          for (const colIndex in columnSearch) {
            const col = columns[colIndex];
            const val =
              typeof col.render === "function"
                ? col.render(row[col.data], "display", row)
                : row[col.data];
            if (
              !val
                ?.toString()
                .toLowerCase()
                .includes(columnSearch[colIndex].toLowerCase())
            ) {
              matchesColumns = false;
              break;
            }
          }

          return matchesSearch && matchesColumns;
        });
      }

      const tableApi = {
        search: function (term) {
          searchTerm = term;
          applyFilters();
          return tableApi;
        },
        draw: function () {
          console.log("Tabla actualizada:");
          console.table(filteredData);
        },
        columns: function (index) {
          return {
            search: function (term) {
              columnSearch[index] = term;
              applyFilters();
              return tableApi;
            },
          };
        },
        row: function (rowEl) {
          return {
            remove: function () {
              const id = rowEl.dataset?.id;
              data = data.filter((r) => r.id !== Number(id));
              applyFilters();
              return tableApi;
            },
          };
        },
        data: () => data,
        filteredData: () => filteredData,
      };

      return tableApi;
    },
  };

  // Integrar DataTable como en jQuery
  simulateSelector.fn.DataTable = simulateSelector.fn.DataTable;

  return function (selector) {
    const sel = simulateSelector(selector);
    sel.DataTable = simulateSelector.fn.DataTable;
    return sel;
  };
})();
