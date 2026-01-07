import maplibregl, { Map as MaplibreMap } from "maplibre-gl";
import { useMapDraw } from "maplibre-gl-multiple-color-draw";
import "maplibre-gl/dist/maplibre-gl.css";
import type { ChangeEvent } from "react";
import { useCallback, useEffect, useRef, useState } from "react";

function MapDrawComponent() {
  const mapContainer = useRef<HTMLDivElement>(null);
  const mapRef = useRef<MaplibreMap | null>(null);
  const [currentMode, setCurrentMode] = useState<string | null>(null);
  const [color, setColor] = useState("#3388ff");
  const [thickness, setThickness] = useState(2);
  const [mapReady, setMapReady] = useState(false);

  useEffect(() => {
    if (mapRef.current || !mapContainer.current) return;

    mapRef.current = new maplibregl.Map({
      container: mapContainer.current,
      style: "https://basemaps.cartocdn.com/gl/voyager-gl-style/style.json",
      center: [0, 0],
      zoom: 2,
    });

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  // Use the MapDraw hook
  const {
    enable,
    setMode,
    setColor: setDrawColor,
    setThickness: setDrawThickness,
    getGeoJSON,
    clear,
  } = useMapDraw(mapRef.current, {
    color,
    thickness,
  });

  useEffect(() => {
    const currentMap = mapRef.current;
    if (!currentMap) return;

    if (currentMap.loaded()) {
      enable();
      setMapReady(true);
    } else {
      currentMap.once("load", () => {
        enable();
        setMapReady(true);
      });
    }

    return () => {
      if (currentMap) {
        currentMap.remove();
      }
    };
  }, [enable]);

  const handleModeChange = useCallback(
    (mode: string) => {
      const currentMap = mapRef.current;
      if (!currentMap) return;

      const applyMode = () => {
        enable();
        setMode(
          mode as
            | "line"
            | "dashed-line"
            | "freehand"
            | "freehand-dashed"
            | "polygon"
            | "select"
        );
        setCurrentMode(mode);
        setMapReady(true);
      };

      if (currentMap.loaded()) {
        applyMode();
      } else {
        currentMap.once("load", applyMode);
      }
    },
    [enable, setMode]
  );

  const handleColorChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newColor = e.target.value;
    setColor(newColor);
    setDrawColor(newColor);
  };

  const handleThicknessChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newThickness = parseInt(e.target.value, 10);
    setThickness(newThickness);
    setDrawThickness(newThickness);
  };

  const handleClear = () => {
    if (window.confirm("Clear all drawings?")) {
      clear();
    }
  };

  const handleExport = () => {
    const geoJSON = getGeoJSON();
    const blob = new Blob([JSON.stringify(geoJSON, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `drawing-${new Date().toISOString().slice(0, 10)}.geojson`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div style={{ display: "flex", height: "100vh", width: "100%" }}>
      <div
        style={{
          width: "250px",
          backgroundColor: "#fff",
          padding: "20px",
          overflowY: "auto",
          borderRight: "1px solid #e0e0e0",
          boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
        }}
      >
        <h2
          style={{ fontSize: "18px", fontWeight: "bold", marginBottom: "20px" }}
        >
          Map Drawing Tool
        </h2>

        <div style={{ marginBottom: "20px" }}>
          <label
            style={{
              fontSize: "12px",
              fontWeight: "600",
              color: "#666",
              display: "block",
              marginBottom: "8px",
            }}
          >
            Mode{" "}
            {!currentMode && (
              <span style={{ color: "#999", fontSize: "10px" }}>
                (Select a mode to start)
              </span>
            )}
          </label>
          <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            {[
              "line",
              "dashed-line",
              "freehand",
              "freehand-dashed",
              "polygon",
              "select",
            ].map((mode) => (
              <button
                key={mode}
                onClick={() => handleModeChange(mode)}
                style={{
                  padding: "8px 12px",
                  fontSize: "13px",
                  border: "1px solid #ddd",
                  borderRadius: "4px",
                  backgroundColor: currentMode === mode ? "#3388ff" : "#fff",
                  color: currentMode === mode ? "#fff" : "#333",
                  cursor: "pointer",
                  transition: "all 0.2s",
                  fontWeight: currentMode === mode ? "600" : "400",
                }}
              >
                {mode.replace("-", " ").charAt(0).toUpperCase() +
                  mode.replace("-", " ").slice(1)}
              </button>
            ))}
          </div>
        </div>

        <div style={{ marginBottom: "20px" }}>
          <label
            style={{
              fontSize: "12px",
              fontWeight: "600",
              color: "#666",
              display: "block",
              marginBottom: "8px",
            }}
          >
            Color
          </label>
          <input
            type="color"
            value={color}
            onChange={handleColorChange}
            style={{
              width: "100%",
              height: "40px",
              border: "1px solid #ddd",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          />
        </div>

        <div style={{ marginBottom: "20px" }}>
          <label
            style={{
              fontSize: "12px",
              fontWeight: "600",
              color: "#666",
              display: "block",
              marginBottom: "8px",
            }}
          >
            Thickness: {thickness}px
          </label>
          <input
            type="range"
            min="1"
            max="10"
            value={thickness}
            onChange={handleThicknessChange}
            style={{ width: "100%" }}
          />
        </div>

        <div style={{ display: "flex", gap: "8px", marginBottom: "20px" }}>
          <button
            onClick={handleClear}
            style={{
              flex: 1,
              padding: "8px",
              fontSize: "13px",
              border: "1px solid #ddd",
              borderRadius: "4px",
              backgroundColor: "#fff",
              cursor: "pointer",
              transition: "all 0.2s",
            }}
            onMouseEnter={(e) =>
              ((e.target as HTMLButtonElement).style.backgroundColor =
                "#f5f5f5")
            }
            onMouseLeave={(e) =>
              ((e.target as HTMLButtonElement).style.backgroundColor = "#fff")
            }
          >
            Clear
          </button>
          <button
            onClick={handleExport}
            style={{
              flex: 1,
              padding: "8px",
              fontSize: "13px",
              border: "1px solid #ddd",
              borderRadius: "4px",
              backgroundColor: "#fff",
              cursor: "pointer",
              transition: "all 0.2s",
            }}
            onMouseEnter={(e) =>
              ((e.target as HTMLButtonElement).style.backgroundColor =
                "#f5f5f5")
            }
            onMouseLeave={(e) =>
              ((e.target as HTMLButtonElement).style.backgroundColor = "#fff")
            }
          >
            Export
          </button>
        </div>

        <div
          style={{
            fontSize: "11px",
            color: "#888",
            lineHeight: "1.5",
            backgroundColor: "#f9f9f9",
            padding: "10px",
            borderRadius: "4px",
          }}
        >
          <strong>Tips:</strong>
          <div>• Line/Polygon: Click points, double-click to finish</div>
          <div>• Freehand: Click to start, move, click to finish</div>
          <div>• Select: Click to select, drag to move</div>
        </div>
      </div>

      <div
        ref={mapContainer}
        style={{
          flex: 1,
          height: "100%",
          width: "100%",
        }}
      />
    </div>
  );
}

export default MapDrawComponent;
