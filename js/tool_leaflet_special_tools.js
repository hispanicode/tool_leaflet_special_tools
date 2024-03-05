// @license magnet:?xt=urn:btih:0b31508aeb0634b347b8270c7bee4d411b5d4109&dn=agpl-3.0.txt AGPL-3.0
/*global get_label, page_globals, SHOW_DEBUG, DEDALO_CORE_URL */
/*eslint no-undef: "error"*/

import {common} from '../../../core/common/js/common.js';
import {tool_common} from '../../tool_common/js/tool_common.js';

import {render_tool_leaflet_special_tools} from './render_tool_leaflet_special_tools.js';


export const tool_leaflet_special_tools = function () {

        this.component_geolocation = null;
	this.model = null;
	this.events_tokens = null;
	this.status = null;
	this.main_element = null;
        this.context = null;
	this.type = null;
	this.source_lang = null;
	this.target_lang = null;
	this.langs = null;
	this.caller = null;
        this.tool_config = null;
        
};

tool_leaflet_special_tools.prototype.render = tool_common.prototype.render;
// destroy: using common destroy method
tool_leaflet_special_tools.prototype.destroy = common.prototype.destroy;
// refresh: using common refresh method
tool_leaflet_special_tools.prototype.refresh = common.prototype.refresh;
tool_leaflet_special_tools.prototype.edit = render_tool_leaflet_special_tools.prototype.edit;

tool_leaflet_special_tools.prototype.init = async function(options) {

	const common_init = await tool_common.prototype.init.call(this, options);        
	return common_init;
        
};

tool_leaflet_special_tools.prototype.build = async function(autoload=false) {

	const common_build = await tool_common.prototype.build.call(this, autoload);
	return common_build;
};