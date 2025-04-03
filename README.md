# Kendo Examples for Bug reproduction

problem with rowHeight sync and locked columns


kendo resize sensor ViewChildren are not yet initialized in afterViewInit if no locked column is present yet
````ts
initResizeService() {
    this.resizeService.connect(merge(...this.resizeSensors.map(sensor => sensor.resize)));
  }
````

````ts
public get isLocked(): boolean {
  return this.lockedLeafColumns.length > 0;
}
````
