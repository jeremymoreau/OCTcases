import Viewer from 'viewerjs'

// Get parsed JSON object from JSON file at path
export function getJSON(path) {
    const Httpreq = new XMLHttpRequest();
    Httpreq.open("GET", path, false);
    Httpreq.send(null);
    return JSON.parse(Httpreq.responseText);
}

// Make all images (in an <img> tag) on page zoomable
export function makeImagesZoomable() {
    const images = document.querySelectorAll('img');
    for (const image of images) {
        const viewer = new Viewer(image, {
            navbar: false, button: false, toolbar: false, title: false, tooltip: false, rotatable: false,
            viewed() {
                viewer.zoomTo(1);
            },
        },
        )
    }
}