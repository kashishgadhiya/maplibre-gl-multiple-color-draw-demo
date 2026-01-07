# MapLibre Draw Demo

A demonstration of the `maplibre-gl-multiple-color-draw` library, showcasing advanced map drawing and editing capabilities built with MapLibre GL JS and React.

## 🚀 Features

- **Interactive Drawing Tools**: Draw points, lines, and polygons with ease
- **Multiple Colors**: Support for various colors and styles for different features
- **Edit & Delete**: Modify existing shapes or remove them as needed
- **Responsive Design**: Works seamlessly across different screen sizes
- **TypeScript Support**: Built with TypeScript for better developer experience
- **Modern Stack**: Utilizes Vite, React 19, and Tailwind CSS

## 🛠️ Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>

   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

## 🏗️ Project Structure

```
test-maplibre-draw/
├── src/                  # Source files
├── public/              # Static assets
├── index.html           # Main HTML entry point
├── MapDrawComponent.tsx # Main React component
├── package.json         # Project dependencies
└── vite.config.ts       # Vite configuration
```

## 📦 Dependencies

- `maplibre-gl`: WebGL-powered vector maps
- `maplibre-gl-multiple-color-draw`: Enhanced drawing tools for MapLibre
- `react` & `react-dom`: UI library
- `vite`: Build tool and dev server
- `tailwindcss`: Utility-first CSS framework

## 🧪 Development

- Run the development server:
  ```bash
  npm run dev
  ```

- Build for production:
  ```bash
  npm run build
  ```

- Preview production build:
  ```bash
  npm run preview
  ```

## 📝 Usage Example

The main drawing functionality is implemented in `MapDrawComponent.tsx`. Here's a quick example of how to use the drawing tools:

```tsx
import { MapLibreDraw } from 'maplibre-gl-multiple-color-draw';

// Initialize the draw control
const draw = new MapLibreDraw({
  displayControlsDefault: false,
  controls: {
    point: true,
    line_string: true,
    polygon: true,
    trash: true
  }
});

// Add to your map
map.addControl(draw);
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

Built with ❤️ using MapLibre GL JS and React"# maplibre-gl-multiple-color-draw-demo" 
