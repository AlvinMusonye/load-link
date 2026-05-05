// Load Link Map State Store
// Zustand store for map-related UI state: selected vehicles, viewport, filters

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useMapStore = create(
  persist(
    (set, get) => ({
      // Selected vehicle/driver
      selectedVehicleId: null,
      selectedDriverId: null,
      selectedShipmentId: null,

      // Map viewport state
      viewport: {
        center: [36.8219, -1.2921], // Nairobi coordinates [longitude, latitude]
        zoom: 10,
        bearing: 0,
        pitch: 0,
      },

      // Map style and display options
      mapStyle: 'default', // 'default', 'satellite', 'dark'
      showRoutes: false,
      showHeatmap: false,
      showGeofences: false,
      showTraffic: false,

      // Active filters
      filters: {
        vehicleStatus: [], // 'ACTIVE', 'IDLE', 'MAINTENANCE', 'OFFLINE', 'IN_TRANSIT'
        vehicleType: [], // 'TRUCK', 'VAN', 'MOTORCYCLE', 'TRAILER', 'CONTAINER'
        driverStatus: [], // 'AVAILABLE', 'DRIVING', 'OFF_DUTY'
        shipmentStatus: [], // Various shipment statuses
        organizationId: null,
      },

      // Search and clustering
      searchQuery: '',
      clusteringEnabled: true,
      clusterMaxZoom: 14,

      // Layer visibility
      layers: {
        vehicles: true,
        routes: true,
        markers: true,
        labels: true,
        heatmap: false,
        geofences: false,
      },

      // Map interaction state
      isDrawingMode: false,
      drawingMode: null, // 'polygon', 'line', 'point'
      measurements: [],

      // Real-time updates
      realTimeEnabled: true,
      updateInterval: 30000, // 30 seconds
      lastUpdate: null,

      // Actions
      setSelectedVehicle: (vehicleId) => set({ selectedVehicleId: vehicleId }),
      setSelectedDriver: (driverId) => set({ selectedDriverId: driverId }),
      setSelectedShipment: (shipmentId) => set({ selectedShipmentId: shipmentId }),

      clearSelections: () => set({
        selectedVehicleId: null,
        selectedDriverId: null,
        selectedShipmentId: null,
      }),

      // Viewport management
      setViewport: (viewport) => set({ viewport }),
      updateViewport: (updates) => set((state) => ({
        viewport: { ...state.viewport, ...updates }
      })),

      // Map style
      setMapStyle: (style) => set({ mapStyle: style }),
      toggleRoutes: () => set((state) => ({ showRoutes: !state.showRoutes })),
      toggleHeatmap: () => set((state) => ({ showHeatmap: !state.showHeatmap })),
      toggleGeofences: () => set((state) => ({ showGeofences: !state.showGeofences })),
      toggleTraffic: () => set((state) => ({ showTraffic: !state.showTraffic })),

      // Filter management
      setFilters: (filters) => set({ filters }),
      updateFilter: (filterType, values) => set((state) => ({
        filters: { ...state.filters, [filterType]: values }
      })),
      clearFilters: () => set({
        filters: {
          vehicleStatus: [],
          vehicleType: [],
          driverStatus: [],
          shipmentStatus: [],
          organizationId: null,
        }
      }),

      // Search
      setSearchQuery: (query) => set({ searchQuery: query }),
      clearSearch: () => set({ searchQuery: '' }),

      // Clustering
      toggleClustering: () => set((state) => ({ 
        clusteringEnabled: !state.clusteringEnabled 
      })),
      setClusterMaxZoom: (zoom) => set({ clusterMaxZoom: zoom }),

      // Layer visibility
      toggleLayer: (layerName) => set((state) => ({
        layers: { ...state.layers, [layerName]: !state.layers[layerName] }
      })),
      setLayerVisibility: (layerName, visible) => set((state) => ({
        layers: { ...state.layers, [layerName]: visible }
      })),

      // Drawing mode
      setDrawingMode: (mode) => set({ 
        isDrawingMode: !!mode, 
        drawingMode: mode 
      }),
      exitDrawingMode: () => set({ 
        isDrawingMode: false, 
        drawingMode: null 
      }),

      // Measurements
      addMeasurement: (measurement) => set((state) => ({
        measurements: [...state.measurements, {
          id: Date.now(),
          timestamp: new Date().toISOString(),
          ...measurement,
        }]
      })),
      clearMeasurements: () => set({ measurements: [] }),
      removeMeasurement: (id) => set((state) => ({
        measurements: state.measurements.filter(m => m.id !== id)
      })),

      // Real-time updates
      toggleRealTime: () => set((state) => ({ 
        realTimeEnabled: !state.realTimeEnabled 
      })),
      setUpdateInterval: (interval) => set({ updateInterval: interval }),
      updateLastUpdateTime: () => set({ lastUpdate: new Date().toISOString() }),

      // Map presets
      applyPreset: (preset) => {
        const state = get();
        switch (preset) {
          case 'all-vehicles':
            set({
              filters: {
                ...state.filters,
                vehicleStatus: [],
                vehicleType: [],
              },
              layers: {
                ...state.layers,
                vehicles: true,
                routes: false,
                heatmap: false,
              },
              showRoutes: false,
              showHeatmap: false,
            });
            break;
          case 'active-deliveries':
            set({
              filters: {
                ...state.filters,
                vehicleStatus: ['IN_TRANSIT'],
                shipmentStatus: ['IN_TRANSIT', 'OUT_FOR_DELIVERY'],
              },
              layers: {
                ...state.layers,
                vehicles: true,
                routes: true,
                heatmap: false,
              },
              showRoutes: true,
              showHeatmap: false,
            });
            break;
          case 'fleet-heatmap':
            set({
              filters: {
                ...state.filters,
                vehicleStatus: ['ACTIVE', 'IN_TRANSIT'],
              },
              layers: {
                ...state.layers,
                vehicles: false,
                routes: false,
                heatmap: true,
              },
              showRoutes: false,
              showHeatmap: true,
              clusteringEnabled: false,
            });
            break;
          case 'exceptions-only':
            set({
              filters: {
                ...state.filters,
                vehicleStatus: ['OFFLINE', 'MAINTENANCE'],
                shipmentStatus: ['EXCEPTION'],
              },
              layers: {
                ...state.layers,
                vehicles: true,
                routes: false,
                heatmap: false,
              },
              showRoutes: false,
              showHeatmap: false,
            });
            break;
        }
      },

      // Map bounds and fit operations
      fitToVehicles: (vehicleIds) => {
        // This would be called by the map component to fit bounds
        set({ 
          fitTo: {
            type: 'vehicles',
            ids: vehicleIds,
          }
        });
      },

      fitToShipment: (shipmentId) => {
        set({ 
          fitTo: {
            type: 'shipment',
            id: shipmentId,
          }
        });
      },

      fitToGeofence: (geofenceId) => {
        set({ 
          fitTo: {
            type: 'geofence',
            id: geofenceId,
          }
        });
      },

      clearFitTo: () => set({ fitTo: null }),

      // Custom map controls
      customControls: {
        showSpeedControls: false,
        showAltitudeControls: false,
        showCompass: true,
        showScale: true,
      },

      toggleCustomControl: (controlName) => set((state) => ({
        customControls: {
          ...state.customControls,
          [controlName]: !state.customControls[controlName],
        }
      })),

      // Map performance settings
      performance: {
        maxMarkers: 1000,
        enableLOD: true, // Level of Detail
        throttleUpdates: true,
        simplifyRoutes: true,
      },

      updatePerformanceSettings: (settings) => set((state) => ({
        performance: { ...state.performance, ...settings }
      })),
    }),
    {
      name: 'loadlink-map-store',
      // Persist map preferences but not real-time state
      partialize: (state) => ({
        mapStyle: state.mapStyle,
        showRoutes: state.showRoutes,
        showHeatmap: state.showHeatmap,
        showGeofences: state.showGeofences,
        showTraffic: state.showTraffic,
        filters: state.filters,
        clusteringEnabled: state.clusteringEnabled,
        clusterMaxZoom: state.clusterMaxZoom,
        layers: state.layers,
        realTimeEnabled: state.realTimeEnabled,
        updateInterval: state.updateInterval,
        customControls: state.customControls,
        performance: state.performance,
      }),
    }
  )
);

// Selectors for common map state combinations
export const useMapSelectors = {
  // Get current selection state
  hasSelection: () => useMapStore((state) => 
    !!(state.selectedVehicleId || state.selectedDriverId || state.selectedShipmentId)
  ),

  // Check if any filters are active
  hasActiveFilters: () => useMapStore((state) => {
    const { filters } = state;
    return Object.values(filters).some(value => 
      Array.isArray(value) ? value.length > 0 : value !== null
    );
  }),

  // Get active filter count
  activeFilterCount: () => useMapStore((state) => {
    const { filters } = state;
    return Object.values(filters).reduce((count, value) => 
      count + (Array.isArray(value) ? value.length : (value ? 1 : 0)), 0
    );
  }),

  // Check if map is in real-time mode
  isRealTimeMode: () => useMapStore((state) => state.realTimeEnabled),

  // Get current viewport bounds (for API calls)
  viewportBounds: () => useMapStore((state) => state.viewport),

  // Get map performance mode
  isPerformanceMode: () => useMapStore((state) => state.performance.maxMarkers < 500),
};

export default useMapStore;
