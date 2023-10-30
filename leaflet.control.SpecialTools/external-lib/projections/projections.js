/*
 * Author: Manuel Jesús Dávila González
 * e-mail: manudavgonz@gmail.com
 */
const projections = {
    
    point(GEOJSON, EPSG) {

            if (typeof EPSG === 'undefined') {

                EPSG = null;

            }
            
            var point;

            crs = {"crs": { "type": "name", "properties": { "name": "urn:ogc:def:crs:EPSG::3857" } }};

            OBJECTS = new Array();

            if (GEOJSON.hasOwnProperty("crs") && EPSG !== null) {

                for (let proj in EPSG) {

                    if (GEOJSON.crs.properties.name === EPSG[proj].crs) {

                        if (EPSG[proj].zone !== null && EPSG[proj].band !== null) {
                            json = GEOJSON;
                            if (typeof json.geometry.coordinates[0] === 'number'
                                && !Number.isNaN(json.geometry.coordinates[0])
                                ) {
                                _x = json.geometry.coordinates[0];
                                _y = json.geometry.coordinates[1];
                                item = L.utm({x: _x, y: _y, zone: EPSG[proj].zone, band: EPSG[proj].band});
                                json.geometry.coordinates[0] = item.latLng().lat;
                                json.geometry.coordinates[1] = item.latLng().lng;
                            }

                            point = L.marker(json.geometry.coordinates);
                            point.feature = point.toGeoJSON();
                            point.feature.special_tools = {};
                            point.feature.special_tools.tools_id = this.make_id(20);
                            point.feature.special_tools.is_geojson = true;
                            point.feature.special_tools.geoman_edition = false;
                            point.feature.properties = json.properties;
                            point.feature.crs = crs.crs;
                            OBJECTS.push(point); 

                        } 

                        else {

                            json = GEOJSON;

                            coordinates = json.geometry.coordinates;

                            point_coord = L.GeoJSON.coordsToLatLngs(coordinates);

                            point = L.marker(point_coord);
                            point.feature = point.toGeoJSON();
                            point.feature.special_tools = {};
                            point.feature.special_tools.tools_id = this.make_id(20);
                            point.feature.special_tools.is_geojson = true;
                            point.feature.special_tools.geoman_edition = false;
                            point.feature.properties = json.properties;
                            OBJECTS.push(point);

                        }

                    } 
                }
            } 

            else {

                json = GEOJSON;

                coordinates = json.geometry.coordinates;
                point_coord = L.GeoJSON.coordsToLatLngs(coordinates);
                point = L.marker(point_coord);
                point.feature = point.toGeoJSON();
                point.feature.special_tools = {};
                point.feature.special_tools.tools_id = this.make_id(20);
                point.feature.special_tools.is_geojson = true;
                point.feature.special_tools.geoman_edition = false;
                point.feature.properties = json.properties;
                OBJECTS.push(point);

            }

        return OBJECTS;

    },

    multipoint(GEOJSON, EPSG) {

            if (typeof EPSG === 'undefined') {

                EPSG = null;

            }
            
            var point;

            crs = {"crs": { "type": "name", "properties": { "name": "urn:ogc:def:crs:EPSG::3857" } }};

            OBJECTS = new Array();

            if (GEOJSON.hasOwnProperty("crs") && EPSG !== null) {

                for (let proj in EPSG) {

                    if (GEOJSON.crs.properties.name === EPSG[proj].crs) {

                        if (EPSG[proj].zone !== null && EPSG[proj].band !== null) {

                            json = GEOJSON;

                            for (let index in json.geometry.coordinates) {
                                if (typeof json.geometry.coordinates[index][0] === 'number'
                                    && !Number.isNaN(json.geometry.coordinates[index][0])
                                    ) {

                                    _x = json.geometry.coordinates[index][0];
                                    _y = json.geometry.coordinates[index][1];
                                    item = L.utm({x: _x, y: _y, zone: EPSG[proj].zone, band: EPSG[proj].band});
                                    json.geometry.coordinates[index][0] = item.latLng().lat;
                                    json.geometry.coordinates[index][1] = item.latLng().lng;

                                }

                                point = L.marker(json.geometry.coordinates[index]);
                                point.feature = point.toGeoJSON();
                                point.feature.special_tools = {};
                                point.feature.special_tools.tools_id = this.make_id(20);
                                point.feature.special_tools.is_geojson = true;
                                point.feature.special_tools.geoman_edition = false;
                                point.feature.properties = json.properties;
                                point.feature.crs = crs.crs;
                                OBJECTS.push(point); 

                            }

                        } 

                        else {

                            json = GEOJSON;

                            coordinates = json.geometry.coordinates;

                            for (let index in coordinates) {

                                point_coord = L.GeoJSON.coordsToLatLngs(coordinates[index]);

                                point = L.marker(point_coord);
                                point.feature = point.toGeoJSON();
                                point.feature.special_tools = {};
                                point.feature.special_tools.tools_id = this.make_id(20);
                                point.feature.special_tools.is_geojson = true;
                                point.feature.special_tools.geoman_edition = false;
                                point.feature.properties = json.properties;
                                OBJECTS.push(point);

                            }

                        }

                    } 
                }
            } 
            else {

                json = GEOJSON;

                coordinates = json.geometry.coordinates;

                for (let index in coordinates) {

                    point_coord = L.GeoJSON.coordsToLatLngs(coordinates[index]);
                    point = L.marker(point_coord);
                    point.feature = point.toGeoJSON();
                    point.feature.special_tools = {};
                    point.feature.special_tools.tools_id = this.make_id(20);
                    point.feature.special_tools.is_geojson = true;
                    point.feature.special_tools.geoman_edition = false;
                    point.feature.properties = json.properties;

                    OBJECTS.push(point);
                }
            }

        return OBJECTS;

    },

    polygon(GEOJSON, EPSG) {

            if (typeof EPSG === 'undefined') {

                EPSG = null;

            }
            
            var polygon;

            crs = {"crs": { "type": "name", "properties": { "name": "urn:ogc:def:crs:EPSG::3857" } }};

            OBJECTS = new Array();

            if (GEOJSON.hasOwnProperty("crs") && EPSG !== null) {

                for (let proj in EPSG) {

                    if (GEOJSON.crs.properties.name === EPSG[proj].crs) {

                        if (EPSG[proj].zone !== null && EPSG[proj].band !== null) {

                            json = GEOJSON;

                            for (let index in json.geometry.coordinates) {

                                if (typeof json.geometry.coordinates[index][0] === 'number'
                                    && !Number.isNaN(json.geometry.coordinates[index][0])
                                    ) {

                                    _x = json.geometry.coordinates[index][0];
                                    _y = json.geometry.coordinates[index][1];
                                    item = L.utm({x: _x, y: _y, zone: EPSG[proj].zone, band: EPSG[proj].band});
                                    json.geometry.coordinates[index][0] = item.latLng().lat;
                                    json.geometry.coordinates[index][1] = item.latLng().lng;
                                }

                                polygon = L.polygon(json.geometry.coordinates);
                                polygon.feature = polygon.toGeoJSON();
                                polygon.feature.special_tools = {};
                                polygon.feature.special_tools.tools_id = this.make_id(20);
                                polygon.feature.special_tools.is_geojson = true;
                                polygon.feature.special_tools.geoman_edition = false;
                                polygon.feature.properties = json.properties;
                                polygon.feature.crs = crs.crs;
                                OBJECTS.push(polygon); 
                            }

                        } 

                        else {

                            json = GEOJSON;

                            coordinates = json.geometry.coordinates;

                            for (let index in coordinates) {

                                polygon_coord = L.GeoJSON.coordsToLatLngs(coordinates[index]);

                                polygon = L.polygon(polygon_coord);
                                polygon.feature = polygon.toGeoJSON();
                                polygon.feature.special_tools = {};
                                polygon.feature.special_tools.tools_id = this.make_id(20);
                                polygon.feature.special_tools.is_geojson = true;
                                polygon.feature.special_tools.geoman_edition = false;
                                polygon.feature.properties = json.properties;
                                OBJECTS.push(polygon);

                            }

                        }

                    } 
                }
            } 

            else {

                json = GEOJSON;

                coordinates = json.geometry.coordinates;

                for (let index in coordinates) {

                    polygon_coord = L.GeoJSON.coordsToLatLngs(coordinates[index]);

                    polygon = L.polygon(polygon_coord);
                    polygon.feature = polygon.toGeoJSON();
                    polygon.feature.special_tools = {};
                    polygon.feature.special_tools.tools_id = this.make_id(20);
                    polygon.feature.special_tools.is_geojson = true;
                    polygon.feature.special_tools.geoman_edition = false;
                    polygon.feature.properties = json.properties;
                    OBJECTS.push(polygon);

                }
            }

        return OBJECTS;

    },

    multipolygon(GEOJSON, EPSG) {

            if (typeof EPSG === 'undefined') {

                EPSG = null;

            }
            
            var polygon;

            crs = {"crs": { "type": "name", "properties": { "name": "urn:ogc:def:crs:EPSG::3857" } }};

            OBJECTS = new Array();

            multi_id = this.make_id(20);

            if (GEOJSON.hasOwnProperty("crs") && EPSG !== null) {

                for (let proj in EPSG) {

                    if (GEOJSON.crs.properties.name === EPSG[proj].crs) {

                        if (EPSG[proj].zone !== null && EPSG[proj].band !== null) {

                            json = GEOJSON;

                            for (let index_1 in json.geometry.coordinates) {

                                for (let index_2 in json.geometry.coordinates[index_1]) {

                                    if (typeof json.geometry.coordinates[index_1][index_2][0] === 'number'
                                        && !Number.isNaN(json.geometry.coordinates[index_1][index_2][0])
                                        ) {

                                        _x = json.geometry.coordinates[index_1][index_2][0];
                                        _y = json.geometry.coordinates[index_1][index_2][1];
                                        item = L.utm({x: _x, y: _y, zone: EPSG[proj].zone, band: EPSG[proj].band});
                                        json.geometry.coordinates[index_1][index_2][0] = item.latLng().lat;
                                        json.geometry.coordinates[index_1][index_2][1] = item.latLng().lng;

                                    } else {

                                        for (let index_3 in json.geometry.coordinates[index_1][index_2]) {

                                            _x = json.geometry.coordinates[index_1][index_2][index_3][0];
                                            _y = json.geometry.coordinates[index_1][index_2][index_3][1];

                                            item = L.utm({x: _x, y: _y, zone: EPSG[proj].zone, band: EPSG[proj].band});
                                            json.geometry.coordinates[index_1][index_2][index_3][0] = item.latLng().lat;
                                            json.geometry.coordinates[index_1][index_2][index_3][1] = item.latLng().lng;

                                        }
                                    }
                                }

                                polygon = L.polygon(json.geometry.coordinates[index_1]);
                                polygon.feature = polygon.toGeoJSON();
                                polygon.feature.special_tools = {};
                                polygon.feature.special_tools.tools_id = this.make_id(20);
                                polygon.feature.special_tools.is_geojson = true;
                                polygon.feature.special_tools.geoman_edition = false;
                                polygon.feature.special_tools.multi_id = multi_id;
                                polygon.feature.properties = json.properties;
                                polygon.feature.crs = crs.crs;
                                OBJECTS.push(polygon);

                            }

                        } 
                        else {

                            json = GEOJSON;

                            coordinates = json.geometry.coordinates;

                            for (let index_1 in coordinates) {

                                for(let index_2 in coordinates[index_1]) {

                                    polygon_coord = L.GeoJSON.coordsToLatLngs(coordinates[index_1][index_2]);

                                    polygon = L.polygon(polygon_coord);
                                    polygon.feature = polygon.toGeoJSON();
                                    polygon.feature.special_tools = {};
                                    polygon.feature.special_tools.tools_id = this.make_id(20);
                                    polygon.feature.special_tools.is_geojson = true;
                                    polygon.feature.special_tools.geoman_edition = false;
                                    polygon.feature.special_tools.multi_id = multi_id;
                                    polygon.feature.properties = json.properties;
                                    OBJECTS.push(polygon);

                                }

                            }

                        }

                    } 
                }
            } 
            else {

                json = GEOJSON;

                coordinates = json.geometry.coordinates;

                for (let index_1 in coordinates) {

                    for(let index_2 in coordinates[index_1]) {

                        polygon_coord = L.GeoJSON.coordsToLatLngs(coordinates[index_1][index_2]);

                        polygon = L.polygon(polygon_coord);
                        polygon.feature = polygon.toGeoJSON();
                        polygon.feature.special_tools = {};
                        polygon.feature.special_tools.tools_id = this.make_id(20);
                        polygon.feature.special_tools.is_geojson = true;
                        polygon.feature.special_tools.geoman_edition = false;
                        polygon.feature.special_tools.multi_id = multi_id;
                        polygon.feature.properties = json.properties;
                        OBJECTS.push(polygon);

                    }

                }
            }

        return OBJECTS;

    },

    linestring(GEOJSON, EPSG) {

            if (typeof EPSG === 'undefined') {

                EPSG = null;

            }
            
            var linestring;

            crs = {"crs": { "type": "name", "properties": { "name": "urn:ogc:def:crs:EPSG::3857" } }};

            OBJECTS = new Array();

            if (GEOJSON.hasOwnProperty("crs") && EPSG !== null) {

                for (let proj in EPSG) {

                    if (GEOJSON.crs.properties.name === EPSG[proj].crs) {

                        if (EPSG[proj].zone !== null && EPSG[proj].band !== null) {

                            json = GEOJSON;

                            for (let index in json.geometry.coordinates) {

                                if (typeof json.geometry.coordinates[index][0] === 'number'
                                    && !Number.isNaN(json.geometry.coordinates[index][0])
                                    ) {

                                    _x = json.geometry.coordinates[index][0];
                                    _y = json.geometry.coordinates[index][1];
                                    item = L.utm({x: _x, y: _y, zone: EPSG[proj].zone, band: EPSG[proj].band});
                                    json.geometry.coordinates[index][0] = item.latLng().lat;
                                    json.geometry.coordinates[index][1] = item.latLng().lng;

                                }
                            }

                            linestring = L.polyline(json.geometry.coordinates);
                            linestring.feature = linestring.toGeoJSON();
                            linestring.feature.special_tools = {};
                            linestring.feature.special_tools.tools_id = this.make_id(20);
                            linestring.feature.special_tools.is_geojson = true;
                            linestring.feature.special_tools.geoman_edition = false;
                            linestring.feature.properties = json.properties;
                            linestring.feature.crs = crs.crs;
                            OBJECTS.push(linestring); 

                        } 
                        else {

                            json = GEOJSON;

                            coordinates = json.geometry.coordinates;

                            linestring_coord = L.GeoJSON.coordsToLatLngs(coordinates);

                            linestring = L.polyline(linestring_coord);
                            linestring.feature = linestring.toGeoJSON();
                            linestring.feature.special_tools = {};
                            linestring.feature.special_tools.tools_id = this.make_id(20);
                            linestring.feature.special_tools.is_geojson = true;
                            linestring.feature.special_tools.geoman_edition = false;
                            linestring.feature.properties = json.properties;
                            OBJECTS.push(linestring);

                        }                   
                    } 
                }
            } 
            else {

                json = GEOJSON;

                coordinates = json.geometry.coordinates;
                linestring_coord = L.GeoJSON.coordsToLatLngs(coordinates);
                linestring = L.polyline(linestring_coord);
                linestring.feature = linestring.toGeoJSON();
                linestring.feature.special_tools = {};
                linestring.feature.special_tools.tools_id = this.make_id(20);
                linestring.feature.special_tools.is_geojson = true;
                linestring.feature.special_tools.geoman_edition = false;
                linestring.feature.properties = json.properties;
                OBJECTS.push(linestring);

            }

        return OBJECTS;

    },

    multilinestring(GEOJSON, EPSG) {

            if (typeof EPSG === 'undefined') {

                EPSG = null;

            }
            
            var linestring;

            crs = {"crs": { "type": "name", "properties": { "name": "urn:ogc:def:crs:EPSG::3857" } }};

            OBJECTS = new Array();

            multi_id = this.make_id(20);

            if (GEOJSON.hasOwnProperty("crs") && EPSG !== null) {

                for (let proj in EPSG) {

                    if (GEOJSON.crs.properties.name === EPSG[proj].crs) {

                        if (EPSG[proj].zone !== null && EPSG[proj].band !== null) {

                            json = GEOJSON;

                            for (let index_1 in json.geometry.coordinates) {

                                for (let index_2 in json.geometry.coordinates[index_1]) {

                                    if (typeof json.geometry.coordinates[index_1][index_2][0] === 'number'
                                        && !Number.isNaN(json.geometry.coordinates[index_1][index_2][0])
                                        ) {

                                        _x = json.geometry.coordinates[index_1][index_2][0];
                                        _y = json.geometry.coordinates[index_1][index_2][1];
                                        item = L.utm({x: _x, y: _y, zone: EPSG[proj].zone, band: EPSG[proj].band});
                                        json.geometry.coordinates[index_1][index_2][0] = item.latLng().lat;
                                        json.geometry.coordinates[index_1][index_2][1] = item.latLng().lng;


                                    } else {

                                        for (let index_3 in json.geometry.coordinates[index_1][index_2]) {

                                            _x = json.geometry.coordinates[index_1][index_2][index_3][0];
                                            _y = json.geometry.coordinates[index_1][index_2][index_3][1];

                                            item = L.utm({x: _x, y: _y, zone: EPSG[proj].zone, band: EPSG[proj].band});
                                            json.geometry.coordinates[index_1][index_2][index_3][0] = item.latLng().lat;
                                            json.geometry.coordinates[index_1][index_2][index_3][1] = item.latLng().lng;

                                        }

                                    }
                                }

                                linestring = L.polyline(json.geometry.coordinates[index_1]);
                                linestring.feature = linestring.toGeoJSON();
                                linestring.feature.special_tools = {};
                                linestring.feature.special_tools.tools_id = this.make_id(20);
                                linestring.feature.special_tools.is_geojson = true;
                                linestring.feature.special_tools.geoman_edition = false;
                                linestring.feature.special_tools.multi_id = multi_id;
                                linestring.feature.properties = json.properties;
                                linestring.feature.crs = crs.crs;
                                OBJECTS.push(linestring);
                            }

                        }  

                        else {

                            json = GEOJSON;

                            coordinates = json.geometry.coordinates;

                            for (let index in coordinates) {

                                linestring_coord = L.GeoJSON.coordsToLatLngs(coordinates[index]);

                                linestring = L.polyline(linestring_coord);
                                linestring.feature = linestring.toGeoJSON();
                                linestring.feature.special_tools = {};
                                linestring.feature.special_tools.tools_id = this.make_id(20);
                                linestring.feature.special_tools.is_geojson = true;
                                linestring.feature.special_tools.geoman_edition = false;
                                linestring.feature.special_tools.multi_id = multi_id;
                                linestring.feature.properties = json.properties;
                                linestring.push(linestring);

                            }

                        }

                    } 
                }
            } 
            else {

                json = GEOJSON;

                coordinates = json.geometry.coordinates;

                for (let index in coordinates) {

                    linestring_coord = L.GeoJSON.coordsToLatLngs(coordinates[index]);

                    linestring = L.polyline(linestring_coord);
                    linestring.feature = linestring.toGeoJSON();
                    linestring.feature.special_tools = {};
                    linestring.feature.special_tools.tools_id = this.make_id(20);
                    linestring.feature.special_tools.is_geojson = true;
                    linestring.feature.special_tools.geoman_edition = false;
                    linestring.feature.special_tools.multi_id = multi_id;
                    linestring.feature.properties = json.properties;
                    OBJECTS.push(linestring);

                }          
            }
            
        return OBJECTS;
        
    },
    
    make_id(length) {

        let result = '';

        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

        const charactersLength = characters.length;

        let counter = 0;

        while (counter < length) {

          result += characters.charAt(Math.floor(Math.random() * charactersLength));
          counter += 1;

        }

        return result;

    }

}