export const getMapPlaceholder = (destination) =>
  Promise.resolve({
    destination,
    center: [34.0522, -118.2437],
    zoom: 12,
    note: 'Interactive map preview coming soon.'
  })
