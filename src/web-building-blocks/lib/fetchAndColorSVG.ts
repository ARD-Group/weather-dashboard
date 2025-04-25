import axios from 'axios';

export const fetchAndColorSVG = async (url: string, color?: string, width?: string, height?: string) => {
  try {
    const response = await axios.get(url);
    const svgText = response.data;

    const parser = new DOMParser();
    const svgDoc = parser.parseFromString(svgText, 'image/svg+xml');
    const svgElement = svgDoc.documentElement;

    // Set width and height on the root SVG element
    if (width) {
      svgElement.setAttribute('width', width);
    }
    if (height) {
      svgElement.setAttribute('height', height);
    }

    const elementsWithStrokeOrFill = svgElement.querySelectorAll('[stroke], [fill]');
    color &&
      elementsWithStrokeOrFill.forEach((element) => {
        if (element.getAttribute('stroke') === '#0F0F11') {
          element.setAttribute('stroke', color);
        }
        if (element.getAttribute('fill') === '#0F0F11') {
          element.setAttribute('fill', color);
        }
      });

    return new XMLSerializer().serializeToString(svgElement);
  } catch (error) {
    console.error('Error fetching SVG:', error);
    return null;
  }
};
