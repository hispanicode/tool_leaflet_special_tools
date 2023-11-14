// @license magnet:?xt=urn:btih:0b31508aeb0634b347b8270c7bee4d411b5d4109&dn=agpl-3.0.txt AGPL-3.0
/*global get_label, page_globals, SHOW_DEBUG, DEDALO_CORE_URL, tool_dummy */
/*eslint no-undef: "error"*/

import {event_manager} from '../../../core/common/js/event_manager.js';
import {ui} from '../../../core/common/js/ui.js';
import {pause} from '../../../core/common/js/utils/index.js';

import {special_tools} from './special_tools.js';
import {special_tools_upload} from './special_tools_upload.js';
import {special_tools_catastro} from './special_tools_catastro.js';
import {special_tools_geolocation} from './special_tools_geolocation.js';
import {special_tools_legend} from './special_tools_legend.js';
import {special_tools_map_image_download} from './special_tools_map_image_download.js';
import {special_tools_objects} from './special_tools_objects.js';
import {special_tools_onexone} from './special_tools_onexone.js';
import {special_tools_roman_empire} from './special_tools_roman_empire.js';
import {special_tools_UA_es} from './special_tools_UA_es.js';
import {special_tools_wms} from './special_tools_wms.js';
import {special_tools_xyz} from './special_tools_xyz.js';

export const render_tool_leaflet_special_tools = function() {

	return true;
        
}

render_tool_leaflet_special_tools.prototype.load_special_tools = async function(L) {

        const content_data = await special_tools.prototype.load(L);

	return content_data;
        
};

render_tool_leaflet_special_tools.prototype.load_special_tools_catastro = async function(L) {

        const content_data = await special_tools_catastro.prototype.load(L, special_tools.prototype);

	return content_data;
        
};

render_tool_leaflet_special_tools.prototype.load_special_tools_geolocation = async function(L) {

        const content_data = await special_tools_geolocation.prototype.load(L, special_tools.prototype);

	return content_data;
        
};

render_tool_leaflet_special_tools.prototype.load_special_tools_legend = async function(L) {

        const content_data = await special_tools_legend.prototype.load(L, special_tools.prototype);

	return content_data;
        
};

render_tool_leaflet_special_tools.prototype.load_special_tools_map_image_download = async function(L) {

        const content_data = await special_tools_map_image_download.prototype.load(L, special_tools.prototype);

	return content_data;
        
};

render_tool_leaflet_special_tools.prototype.load_special_tools_objects = async function(L) {

        const content_data = await special_tools_objects.prototype.load(L, special_tools.prototype);

	return content_data;
        
};

render_tool_leaflet_special_tools.prototype.load_special_tools_onexone = async function(L) {

        const content_data = await special_tools_onexone.prototype.load(L, special_tools.prototype);

	return content_data;
        
};

render_tool_leaflet_special_tools.prototype.load_special_tools_roman_empire = async function(L) {

        const content_data = await special_tools_roman_empire.prototype.load(L, special_tools.prototype);

	return content_data;
        
};

render_tool_leaflet_special_tools.prototype.load_special_tools_UA_es = async function(L) {

        const content_data = await special_tools_UA_es.prototype.load(L, special_tools.prototype);

	return content_data;
        
};

render_tool_leaflet_special_tools.prototype.load_special_tools_upload = async function(L) {

        const content_data = await special_tools_upload.prototype.load(L, special_tools.prototype);

	return content_data;
        
};

render_tool_leaflet_special_tools.prototype.load_special_tools_wms = async function(L) {

        const content_data = await special_tools_wms.prototype.load(L, special_tools.prototype);

	return content_data;
        
};

render_tool_leaflet_special_tools.prototype.load_special_tools_xyz = async function(L) {

        const content_data = await special_tools_xyz.prototype.load(L, special_tools.prototype);

	return content_data;
        
};
