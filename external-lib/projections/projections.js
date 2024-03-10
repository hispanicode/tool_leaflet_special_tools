/*
 * Author: Manuel Jesús Dávila González
 * e-mail: manudavgonz@gmail.com
 */
const projections = {
    
    point(GEOJSON, EPSG) {

            if (typeof EPSG === 'undefined') {

                EPSG = null;

            }

            const default_crs = {"type": "name", "properties": { "name": "urn:ogc:def:crs:EPSG::3857" }};


            if (GEOJSON.hasOwnProperty('crs')) {
                
                if (GEOJSON.crs.properties.name === EPSG['EPSG_3857'].crs) {

                    GEOJSON = turf.toWgs84(GEOJSON);

                }
                
            }

            var OBJECTS = new Array();


            if (GEOJSON.hasOwnProperty("crs") && EPSG !== null) {

                for (let proj in EPSG) {

                    if (GEOJSON.crs.properties.name === EPSG[proj].crs) {

                        if (EPSG[proj].zone !== null && EPSG[proj].band !== null) {
                            
                            const json = GEOJSON;
                            
                            if (typeof json.geometry.coordinates[0] === 'number'
                                && !Number.isNaN(json.geometry.coordinates[0])
                                ) {
                                const _x = json.geometry.coordinates[0];
                                const _y = json.geometry.coordinates[1];
                                const item = L.utm({x: _x, y: _y, zone: EPSG[proj].zone, band: EPSG[proj].band});
                                json.geometry.coordinates[0] = item.latLng().lat;
                                json.geometry.coordinates[1] = item.latLng().lng;
                            }
                            
                            let radius = null;
                            
                            if (json.properties.hasOwnProperty('shape')) {
                                
                                if (json.properties.shape === 'circle') {
                                    
                                    if (json.properties.hasOwnProperty('radius')) {
                                    
                                        try {
                                        
                                            radius = parseFloat(json.properties.radius.replace(' m.'));
                                        
                                        } catch(e) {
                                            
                                            radius = parseFloat(json.properties.radius);
                                            
                                        }
                                    
                                    }
                                    
                                }
                                
                            } else {
                                if (json.properties.hasOwnProperty('color')) delete json.properties.color;
                            }

                            let point;
                            
                            if (radius === null) {

                                point = L.marker(json.geometry.coordinates);
                            
                            } else {
                                
                                point = L.circle(json.geometry.coordinates, {radius: radius});
                                
                            }
                            
                            point.feature = point.toGeoJSON();
                            
                            if (json.hasOwnProperty('special_tools')) {
                                
                                point.feature.special_tools = json.special_tools;
                                
                                if (!json.special_tools.hasOwnProperty('is_editable') && !json.special_tools.hasOwnProperty('is_clipPolygon')) {
                                    
                                    point.feature.special_tools.is_editable = true;
                                    
                                }
                                
                                
                            } else  {
                                
                                point.feature.special_tools = {};
                                point.feature.special_tools.tools_id = this.make_id(20);
                                point.feature.special_tools.is_editable = true;
                                point.feature.special_tools.geoman_edition = false;
                                
                            }
                            
                            point.feature.properties = json.properties;
                            point.feature.crs = default_crs;
                            OBJECTS.push(point); 

                        } 

                        else {

                            const json = GEOJSON;

                            const coordinates = json.geometry.coordinates;
                            
                            let point_coord;
                            
                            try {
                            
                                point_coord = L.GeoJSON.coordsToLatLngs(coordinates);
                            
                            } catch (e) {
                                
                                point_coord = [coordinates[1], coordinates[0]];
                                
                            }

                            let radius = null;
                            
                            if (json.properties.hasOwnProperty('shape')) {
                                
                                if (json.properties.shape === 'circle') {
                                    
                                    if (json.properties.hasOwnProperty('radius')) {
                                    
                                        try {
                                        
                                            radius = parseFloat(json.properties.radius.replace(' m.'));
                                        
                                        } catch(e) {
                                            
                                            radius = parseFloat(json.properties.radius);
                                            
                                        }
                                    
                                    }
                                    
                                }
                                
                            } else {
                                if (json.properties.hasOwnProperty('color')) delete json.properties.color;
                            }
                            
                            let point;
                            
                            if (radius === null) {

                                point = L.marker(point_coord);
                            
                            } else {
                                
                                point = L.circle(point_coord, {radius: radius});
                                
                            }
                            
                            point.feature = point.toGeoJSON();
                            
                            
                            if (json.hasOwnProperty('special_tools')) {
                                
                                point.feature.special_tools = json.special_tools;
                                
                                if (!json.special_tools.hasOwnProperty('is_editable') && !json.special_tools.hasOwnProperty('is_clipPolygon')) {
                                    
                                    point.feature.special_tools.is_editable = true;
                                    
                                }
                                
                            } else  {
                                
                                point.feature.special_tools = {};
                                point.feature.special_tools.tools_id = this.make_id(20);
                                point.feature.special_tools.is_editable = true;
                                point.feature.special_tools.geoman_edition = false;
                                
                            }
                            point.feature.properties = json.properties;
                            OBJECTS.push(point);

                        }

                    } 
                }
            } 

            else {

                const json = GEOJSON;
                
                const coordinates = json.geometry.coordinates;

                let point_coord;

                try {

                    point_coord = L.GeoJSON.coordsToLatLngs(coordinates);

                } catch (e) {

                    point_coord = [coordinates[1], coordinates[0]];
                }
                
                let radius = null;

                if (json.properties.hasOwnProperty('shape')) {

                    if (json.properties.shape === 'circle') {
                        
                        if (json.properties.hasOwnProperty('radius')) {

                            try {

                                radius = parseFloat(json.properties.radius.replace(' m.'));

                            } catch(e) {

                                radius = parseFloat(json.properties.radius);

                            }
                        
                        }

                    }

                } else {
                    if (json.properties.hasOwnProperty('color')) delete json.properties.color;
                }

                let point;
                
                if (radius === null) {

                    point = L.marker(point_coord);

                } else {

                    point = L.circle(point_coord, {radius: radius});

                }
                
                point.feature = point.toGeoJSON();
                
                if (json.hasOwnProperty('special_tools')) {

                    point.feature.special_tools = json.special_tools;
                    
                    if (!json.special_tools.hasOwnProperty('is_editable') && !json.special_tools.hasOwnProperty('is_clipPolygon')) {

                        point.feature.special_tools.is_editable = true;

                    }

                } else   {
                    
                    point.feature.special_tools = {};
                    point.feature.special_tools.tools_id = this.make_id(20);
                    point.feature.special_tools.is_editable = true;
                    point.feature.special_tools.geoman_edition = false;
                
                }
                
                point.feature.properties = json.properties;
                
                OBJECTS.push(point);

            }

        return OBJECTS;

    },

    multipoint(GEOJSON, EPSG) {

            if (typeof EPSG === 'undefined') {

                EPSG = null;

            }
 
            const default_crs = {"type": "name", "properties": { "name": "urn:ogc:def:crs:EPSG::3857" }};

            if (GEOJSON.hasOwnProperty('crs')) {
                
                if (GEOJSON.crs.properties.name === EPSG['EPSG_3857'].crs) {

                    GEOJSON = turf.toWgs84(GEOJSON);

                }
            
            }

            var OBJECTS = new Array();

            if (GEOJSON.hasOwnProperty("crs") && EPSG !== null) {

                for (let proj in EPSG) {

                    if (GEOJSON.crs.properties.name === EPSG[proj].crs) {

                        if (EPSG[proj].zone !== null && EPSG[proj].band !== null) {

                            const json = GEOJSON;

                            for (let index in json.geometry.coordinates) {
                                if (typeof json.geometry.coordinates[index][0] === 'number'
                                    && !Number.isNaN(json.geometry.coordinates[index][0])
                                    ) {

                                    const _x = json.geometry.coordinates[index][0];
                                    const _y = json.geometry.coordinates[index][1];
                                    const item = L.utm({x: _x, y: _y, zone: EPSG[proj].zone, band: EPSG[proj].band});
                                    json.geometry.coordinates[index][0] = item.latLng().lat;
                                    json.geometry.coordinates[index][1] = item.latLng().lng;

                                }
                                
                                let radius = null;

                                if (json.properties.hasOwnProperty('shape')) {

                                    if (json.properties.shape === 'circle') {
                                        
                                        if (json.properties.hasOwnProperty('radius')) {
                                        
                                            try {

                                                radius = parseFloat(json.properties.radius.replace(' m.'));

                                            } catch(e) {

                                                radius = parseFloat(json.properties.radius);

                                            }
                                        
                                        }
                                    }

                                } else {
                                    if (json.properties.hasOwnProperty('color')) delete json.properties.color;
                                }

                                let point;
                                
                                if (radius === null) {

                                    point = L.marker(json.geometry.coordinates[index]);

                                } else {

                                    point = L.circle(json.geometry.coordinates[index], {radius: radius});

                                }

                                point.feature = point.toGeoJSON();
                                
                                if (json.hasOwnProperty('special_tools')) {

                                    point.feature.special_tools = json.special_tools;
                                    
                                    if (!json.special_tools.hasOwnProperty('is_editable') && !json.special_tools.hasOwnProperty('is_clipPolygon')) {

                                        point.feature.special_tools.is_editable = true;

                                    }

                                } else  {
                                    
                                    point.feature.special_tools = {};
                                    point.feature.special_tools.tools_id = this.make_id(20);
                                    point.feature.special_tools.is_editable = true;
                                    point.feature.special_tools.geoman_edition = false;
                                
                                }
                                point.feature.properties = json.properties;
                                point.feature.crs = default_crs;
                                OBJECTS.push(point); 

                            }

                        } 

                        else {

                            const json = GEOJSON;

                            const coordinates = json.geometry.coordinates;
                            
                            let point_coord;

                            for (let index in coordinates) {
                                
                                try {

                                    point_coord = L.GeoJSON.coordsToLatLngs(coordinates[index]);

                                } catch (e) {
                                    
                                    point_coord = [coordinates[index][1], coordinates[index][0]];
                                    
                                }
                                
                                let radius = null;

                                if (json.properties.hasOwnProperty('shape')) {

                                    if (json.properties.shape === 'circle') {
                                        
                                        if (json.properties.hasOwnProperty('radius')) {

                                            try {

                                                radius = parseFloat(json.properties.radius.replace(' m.'));

                                            } catch(e) {

                                                radius = parseFloat(json.properties.radius);

                                            }
                                        
                                        }

                                    }

                                } else {
                                    if (json.properties.hasOwnProperty('color')) delete json.properties.color;
                                }

                                let point;
                                
                                if (radius === null) {

                                    point = L.marker(point_coord);

                                } else {

                                    point = L.circle(point_coord, {radius: radius});

                                }
                                
                                point.feature = point.toGeoJSON();
                                
                                if (json.hasOwnProperty('special_tools')) {

                                    point.feature.special_tools = json.special_tools;
                                    
                                    if (!json.special_tools.hasOwnProperty('is_editable') && !json.special_tools.hasOwnProperty('is_clipPolygon')) {

                                        point.feature.special_tools.is_editable = true;

                                    }

                                } else   {
                                    
                                    point.feature.special_tools = {};
                                    point.feature.special_tools.tools_id = this.make_id(20);
                                    point.feature.special_tools.is_editable = true;
                                    point.feature.special_tools.geoman_edition = false;
                                
                                }
                                
                                point.feature.properties = json.properties;
                                OBJECTS.push(point);

                            }

                        }

                    } 
                }
            }
            
            else {

                const json = GEOJSON;

                const coordinates = json.geometry.coordinates;
                
                let point_coord;

                for (let index in coordinates) {

                    try {
                    
                        point_coord = L.GeoJSON.coordsToLatLngs(coordinates[index]);
                    
                    } catch (e) {
                        
                        point_coord = [coordinates[index][1], coordinates[index][0]];
                        
                    }
                    
                    let radius = null;

                    if (json.properties.hasOwnProperty('shape')) {

                        if (json.properties.shape === 'circle') {
                            
                            if (json.properties.hasOwnProperty('radius')) {

                                try {

                                    radius = parseFloat(json.properties.radius.replace(' m.'));

                                } catch(e) {

                                    radius = parseFloat(json.properties.radius);

                                }
                            
                            }

                        }

                    } else {
                        if (json.properties.hasOwnProperty('color')) delete json.properties.color;
                    }

                    let point;

                    if (radius === null) {

                        point = L.marker(point_coord);

                    } else {

                        point = L.circle(point_coord, {radius: radius});

                    }
                    
                    point.feature = point.toGeoJSON();
                    
                        if (json.hasOwnProperty('special_tools')) {

                            point.feature.special_tools = json.special_tools;
                            
                            if (!json.special_tools.hasOwnProperty('is_editable') && !json.special_tools.hasOwnProperty('is_clipPolygon')) {

                                point.feature.special_tools.is_editable = true;

                            }

                        } else   {
                        
                        point.feature.special_tools = {};
                        point.feature.special_tools.tools_id = this.make_id(20);
                        point.feature.special_tools.is_editable = true;
                        point.feature.special_tools.geoman_edition = false;
                    
                    }
                    
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

            const default_crs = {"type": "name", "properties": { "name": "urn:ogc:def:crs:EPSG::3857" }};

            if (GEOJSON.hasOwnProperty('crs')) {
                
                if (GEOJSON.crs.properties.name === EPSG['EPSG_3857'].crs) {

                    GEOJSON = turf.toWgs84(GEOJSON);

                }
                
            }

            var OBJECTS = new Array();

            if (GEOJSON.hasOwnProperty("crs") && EPSG !== null) {

                for (let proj in EPSG) {

                    if (GEOJSON.crs.properties.name === EPSG[proj].crs) {

                        if (EPSG[proj].zone !== null && EPSG[proj].band !== null) {

                            const json = GEOJSON;

                            for (let index in json.geometry.coordinates) {

                                if (typeof json.geometry.coordinates[index][0] === 'number'
                                    && !Number.isNaN(json.geometry.coordinates[index][0])
                                    ) {

                                    const _x = json.geometry.coordinates[index][0];
                                    const _y = json.geometry.coordinates[index][1];
                                    const item = L.utm({x: _x, y: _y, zone: EPSG[proj].zone, band: EPSG[proj].band});
                                    json.geometry.coordinates[index][0] = item.latLng().lat;
                                    json.geometry.coordinates[index][1] = item.latLng().lng;
                                }

                                const polygon = L.polygon(json.geometry.coordinates);
                                
                                polygon.feature = polygon.toGeoJSON();
                                
                                if (json.hasOwnProperty('special_tools')) {

                                    polygon.feature.special_tools = json.special_tools;
                                    
                                    if (!json.special_tools.hasOwnProperty('is_editable') && !json.special_tools.hasOwnProperty('is_clipPolygon')) {

                                        polygon.feature.special_tools.is_editable = true;

                                    }

                                } else  {
                                    
                                    polygon.feature.special_tools = {};
                                    polygon.feature.special_tools.tools_id = this.make_id(20);
                                    polygon.feature.special_tools.is_editable = true;
                                    polygon.feature.special_tools.geoman_edition = false;
                                
                                }
                                
                                polygon.feature.properties = json.properties;
                                polygon.feature.crs = default_crs;
                                OBJECTS.push(polygon); 
                            }

                        } 

                        else {

                            const json = GEOJSON;

                            const coordinates = json.geometry.coordinates;
                            
                            let polygon_coord;

                            for (let index in coordinates) {

                                polygon_coord = L.GeoJSON.coordsToLatLngs(coordinates[index]);

                                const polygon = L.polygon(polygon_coord);
                                
                                polygon.feature = polygon.toGeoJSON();
                                
                                if (json.hasOwnProperty('special_tools')) {

                                    polygon.feature.special_tools = json.special_tools;
                                    
                                    if (!json.special_tools.hasOwnProperty('is_editable') && !json.special_tools.hasOwnProperty('is_clipPolygon')) {

                                        polygon.feature.special_tools.is_editable = true;

                                    }

                                } else  { 
                                    
                                    polygon.feature.special_tools = {};
                                    polygon.feature.special_tools.tools_id = this.make_id(20);
                                    polygon.feature.special_tools.is_editable = true;
                                    polygon.feature.special_tools.geoman_edition = false;
                                
                                }
                                polygon.feature.properties = json.properties;
                                OBJECTS.push(polygon);

                            }

                        }

                    } 
                }
            } 

            else {

                const json = GEOJSON;

                const coordinates = json.geometry.coordinates;
                
                let polygon_coord;

                for (let index in coordinates) {

                    polygon_coord = L.GeoJSON.coordsToLatLngs(coordinates[index]);

                    const polygon = L.polygon(polygon_coord);
                    
                    polygon.feature = polygon.toGeoJSON();
                    
                        if (json.hasOwnProperty('special_tools')) {

                            polygon.feature.special_tools = json.special_tools;
                            
                            if (!json.special_tools.hasOwnProperty('is_editable') && !json.special_tools.hasOwnProperty('is_clipPolygon')) {

                                polygon.feature.special_tools.is_editable = true;

                            }

                        } else  { 
                        
                        polygon.feature.special_tools = {};
                        polygon.feature.special_tools.tools_id = this.make_id(20);
                        polygon.feature.special_tools.is_editable = true;
                        polygon.feature.special_tools.geoman_edition = false;
                    
                    }
                    
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

            const default_crs = {"type": "name", "properties": { "name": "urn:ogc:def:crs:EPSG::3857" }};

            if (GEOJSON.hasOwnProperty('crs')) {

                if (GEOJSON.crs.properties.name === EPSG['EPSG_3857'].crs) {

                    GEOJSON = turf.toWgs84(GEOJSON);

                }
            
            }

            var OBJECTS = new Array();

            const multi_id = this.make_id(20);

            if (GEOJSON.hasOwnProperty("crs") && EPSG !== null) {

                for (let proj in EPSG) {

                    if (GEOJSON.crs.properties.name === EPSG[proj].crs) {

                        if (EPSG[proj].zone !== null && EPSG[proj].band !== null) {

                            const json = GEOJSON;
                            
                            let item;
                            let _x;
                            let _y;

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

                                const polygon = L.polygon(json.geometry.coordinates[index_1]);
                                
                                polygon.feature = polygon.toGeoJSON();
                                
                                if (json.hasOwnProperty('special_tools')) {

                                    polygon.feature.special_tools = json.special_tools;
                                    
                                    if (!json.special_tools.hasOwnProperty('is_editable') && !json.special_tools.hasOwnProperty('is_clipPolygon')) {

                                        polygon.feature.special_tools.is_editable = true;

                                    }

                                } else  { 
                                    
                                    polygon.feature.special_tools = {};
                                    polygon.feature.special_tools.tools_id = this.make_id(20);
                                    polygon.feature.special_tools.is_editable = true;
                                    polygon.feature.special_tools.geoman_edition = false;
                                    polygon.feature.special_tools.multi_id = multi_id;
                                
                                }
                                polygon.feature.properties = json.properties;
                                polygon.feature.crs = default_crs;
                                OBJECTS.push(polygon);

                            }

                        } 
                        else {

                            const json = GEOJSON;

                            const coordinates = json.geometry.coordinates;

                            for (let index_1 in coordinates) {

                                for(let index_2 in coordinates[index_1]) {

                                    const polygon_coord = L.GeoJSON.coordsToLatLngs(coordinates[index_1][index_2]);

                                    const polygon = L.polygon(polygon_coord);
                                    
                                    polygon.feature = polygon.toGeoJSON();
                                    
                                    if (json.hasOwnProperty('special_tools')) {

                                        polygon.feature.special_tools = json.special_tools;
                                        
                                        if (!json.special_tools.hasOwnProperty('is_editable') && !json.special_tools.hasOwnProperty('is_clipPolygon')) {

                                            polygon.feature.special_tools.is_editable = true;

                                        }

                                    } else  { 
                                    
                                        polygon.feature.special_tools = {};
                                        polygon.feature.special_tools.tools_id = this.make_id(20);
                                        polygon.feature.special_tools.is_editable = true;
                                        polygon.feature.special_tools.geoman_edition = false;
                                        polygon.feature.special_tools.multi_id = multi_id;
                                    
                                    }
                                    
                                    polygon.feature.properties = json.properties;
                                    OBJECTS.push(polygon);

                                }

                            }

                        }

                    } 
                }
            } 
            else {

                const json = GEOJSON;

                const coordinates = json.geometry.coordinates;

                for (let index_1 in coordinates) {

                    for(let index_2 in coordinates[index_1]) {

                        const polygon_coord = L.GeoJSON.coordsToLatLngs(coordinates[index_1][index_2]);

                        const polygon = L.polygon(polygon_coord);
                        
                        polygon.feature = polygon.toGeoJSON();
                        
                        if (json.hasOwnProperty('special_tools')) {

                            polygon.feature.special_tools = json.special_tools;
                            
                            if (!json.special_tools.hasOwnProperty('is_editable') && !json.special_tools.hasOwnProperty('is_clipPolygon')) {

                                polygon.feature.special_tools.is_editable = true;

                            }

                        } else  { 
                            
                            polygon.feature.special_tools = {};
                            polygon.feature.special_tools.tools_id = this.make_id(20);
                            polygon.feature.special_tools.is_editable = true;
                            polygon.feature.special_tools.geoman_edition = false;
                            polygon.feature.special_tools.multi_id = multi_id;
                        
                        }
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

            const default_crs = {"type": "name", "properties": { "name": "urn:ogc:def:crs:EPSG::3857" }};

            if (GEOJSON.hasOwnProperty('crs')) {          
        
                if (GEOJSON.crs.properties.name === EPSG['EPSG_3857'].crs) {

                    GEOJSON = turf.toWgs84(GEOJSON);

                }
            
            }

            var OBJECTS = new Array();

            if (GEOJSON.hasOwnProperty("crs") && EPSG !== null) {

                for (let proj in EPSG) {

                    if (GEOJSON.crs.properties.name === EPSG[proj].crs) {

                        if (EPSG[proj].zone !== null && EPSG[proj].band !== null) {

                            const json = GEOJSON;

                            for (let index in json.geometry.coordinates) {

                                if (typeof json.geometry.coordinates[index][0] === 'number'
                                    && !Number.isNaN(json.geometry.coordinates[index][0])
                                    ) {

                                    const _x = json.geometry.coordinates[index][0];
                                    const _y = json.geometry.coordinates[index][1];
                                    const item = L.utm({x: _x, y: _y, zone: EPSG[proj].zone, band: EPSG[proj].band});
                                    json.geometry.coordinates[index][0] = item.latLng().lat;
                                    json.geometry.coordinates[index][1] = item.latLng().lng;

                                }
                            }

                            const linestring = L.polyline(json.geometry.coordinates);
                            
                            linestring.feature = linestring.toGeoJSON();
                            
                                if (json.hasOwnProperty('special_tools')) {

                                    linestring.feature.special_tools = json.special_tools;
                                    
                                    if (!json.special_tools.hasOwnProperty('is_editable') && !json.special_tools.hasOwnProperty('is_clipPolygon')) {

                                        linestring.feature.special_tools.is_editable = true;

                                    }

                                } else  { 
                                
                                linestring.feature.special_tools = {};
                                linestring.feature.special_tools.tools_id = this.make_id(20);
                                linestring.feature.special_tools.is_editable = true;
                                linestring.feature.special_tools.geoman_edition = false;
                            
                            }
                            linestring.feature.properties = json.properties;
                            linestring.feature.crs = default_crs;
                            OBJECTS.push(linestring); 

                        } 
                        else {

                            const json = GEOJSON;

                            const coordinates = json.geometry.coordinates;
                            
                            let linestring_coord;
                            
                            try {
                                
                                linestring_coord = L.GeoJSON.coordsToLatLngs(coordinates);
                                
                            } catch (e) {
                                
                                linestring_coord = [coordinates[1], coordinates[0]];
                                
                            }

                            const linestring = L.polyline(linestring_coord);
                            
                            linestring.feature = linestring.toGeoJSON();
                            
                                if (json.hasOwnProperty('special_tools')) {

                                    linestring.feature.special_tools = json.special_tools;

                                    if (!json.special_tools.hasOwnProperty('is_editable') && !json.special_tools.hasOwnProperty('is_clipPolygon')) {

                                        linestring.feature.special_tools.is_editable = true;

                                    }

                                } else  { 
                                
                                linestring.feature.special_tools = {};
                                linestring.feature.special_tools.tools_id = this.make_id(20);
                                linestring.feature.special_tools.is_editable = true;
                                linestring.feature.special_tools.geoman_edition = false;
                            
                            }
                            linestring.feature.properties = json.properties;
                            OBJECTS.push(linestring);

                        }                   
                    } 
                }
            } 
            else {

                const json = GEOJSON;

                const coordinates = json.geometry.coordinates;
                
                let linestring_coord;
                
                try {
                    
                    linestring_coord = L.GeoJSON.coordsToLatLngs(coordinates);
                
                } catch (e) {
                    
                    linestring_coord = [coordinates[1], coordinates[0]];
                    
                }
                
                
                const linestring = L.polyline(linestring_coord);
                
                linestring.feature = linestring.toGeoJSON();
                
                    if (json.hasOwnProperty('special_tools')) {

                        linestring.feature.special_tools = json.special_tools;
                        
                        if (!json.special_tools.hasOwnProperty('is_editable') && !json.special_tools.hasOwnProperty('is_clipPolygon')) {

                            linestring.feature.special_tools.is_editable = true;

                        }

                    } else  { 
                    
                    linestring.feature.special_tools = {};
                    linestring.feature.special_tools.tools_id = this.make_id(20);
                    linestring.feature.special_tools.is_editable = true;
                    linestring.feature.special_tools.geoman_edition = false;
                
                }
                
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

            const default_crs = {"type": "name", "properties": { "name": "urn:ogc:def:crs:EPSG::3857"}};

            if (GEOJSON.hasOwnProperty('crs')) {

                if (GEOJSON.crs.properties.name === EPSG['EPSG_3857'].crs) {

                    GEOJSON = turf.toWgs84(GEOJSON);

                }
            
            }

            var OBJECTS = new Array();

            const multi_id = this.make_id(20);

            if (GEOJSON.hasOwnProperty("crs") && EPSG !== null) {

                for (let proj in EPSG) {

                    if (GEOJSON.crs.properties.name === EPSG[proj].crs) {

                        if (EPSG[proj].zone !== null && EPSG[proj].band !== null) {

                            const json = GEOJSON;
                            let _x;
                            let _y;
                            let item;

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

                                const linestring = L.polyline(json.geometry.coordinates[index_1]);
                                
                                linestring.feature = linestring.toGeoJSON();
                                
                                if (json.hasOwnProperty('special_tools')) {

                                    linestring.feature.special_tools = json.special_tools;
                                    
                                    if (!json.special_tools.hasOwnProperty('is_editable') && !json.special_tools.hasOwnProperty('is_clipPolygon')) {

                                        linestring.feature.special_tools.is_editable = true;

                                    }

                                } else  { 
                                    
                                    linestring.feature.special_tools = {};
                                    linestring.feature.special_tools.tools_id = this.make_id(20);
                                    linestring.feature.special_tools.is_editable = true;
                                    linestring.feature.special_tools.geoman_edition = false;
                                    linestring.feature.special_tools.multi_id = multi_id;
                                
                                }
                                
                                linestring.feature.properties = json.properties;
                                linestring.feature.crs = default_crs;
                                
                                OBJECTS.push(linestring);
                            }

                        }  

                        else {

                            const json = GEOJSON;

                            const coordinates = json.geometry.coordinates;

                            for (let index in coordinates) {

                                const linestring_coord = L.GeoJSON.coordsToLatLngs(coordinates[index]);

                                linestring = L.polyline(linestring_coord);
                                
                                linestring.feature = linestring.toGeoJSON();
                                
                                if (json.hasOwnProperty('special_tools')) {

                                    linestring.feature.special_tools = json.special_tools;
                                    
                                    if (!json.special_tools.hasOwnProperty('is_editable') && !json.special_tools.hasOwnProperty('is_clipPolygon')) {

                                        linestring.feature.special_tools.is_editable = true;

                                    }

                                } else  { 
                                    
                                    linestring.feature.special_tools = {};
                                    linestring.feature.special_tools.tools_id = this.make_id(20);
                                    linestring.feature.special_tools.is_editable = true;
                                    linestring.feature.special_tools.geoman_edition = false;
                                    linestring.feature.special_tools.multi_id = multi_id;
                                
                                }
                                
                                linestring.feature.properties = json.properties;
                                OBJECTS.push(linestring);

                            }

                        }

                    } 
                }
            } 
            else {

                const json = GEOJSON;

                const coordinates = json.geometry.coordinates;

                for (let index in coordinates) {

                    const linestring_coord = L.GeoJSON.coordsToLatLngs(coordinates[index]);

                    linestring = L.polyline(linestring_coord);
                    linestring.feature = linestring.toGeoJSON();
                    
                        if (json.hasOwnProperty('special_tools')) {

                            linestring.feature.special_tools = json.special_tools;
                            
                            if (!json.special_tools.hasOwnProperty('is_editable') && !json.special_tools.hasOwnProperty('is_clipPolygon')) {

                                linestring.feature.special_tools.is_editable = true;

                            }

                        } else  { 
                        
                        linestring.feature.special_tools = {};
                        linestring.feature.special_tools.tools_id = this.make_id(20);
                        linestring.feature.special_tools.is_editable = true;
                        linestring.feature.special_tools.geoman_edition = false;
                        linestring.feature.special_tools.multi_id = multi_id;
                    
                    }
                    
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

};