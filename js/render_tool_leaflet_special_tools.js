// @license magnet:?xt=urn:btih:0b31508aeb0634b347b8270c7bee4d411b5d4109&dn=agpl-3.0.txt AGPL-3.0
/*global get_label, page_globals, SHOW_DEBUG, DEDALO_CORE_URL, tool_dummy */
/*eslint no-undef: "error"*/



// imports
	import {event_manager} from '../../../core/common/js/event_manager.js'
// import ui to create DOM nodes and common HTML structures as wrappers or content_data compatible with the all Dédalo
	import {ui} from '../../../core/common/js/ui.js'
	import {pause} from '../../../core/common/js/utils/index.js'



/**
* RENDER_TOOL_DEV_TEMPLATE
* Manages the component's logic and appearance in client side
*/
export const render_tool_leaflet_special_tools = function() {

	return true;
        
}

render_tool_leaflet_special_tools.prototype.edit = async function(options) {

	const self = this;

	// options
		const render_level = options.render_level || 'full';

	// content_data
		const content_data = await get_content_data(self);
                
		if (render_level==='content') {
                    
			return content_data;
                        
		}

	// wrapper. ui build_edit returns a standard built tool wrapper
		const wrapper = ui.tool.build_wrapper_edit(self, {
                    
			content_data : content_data
                        
		});


	return wrapper;
}//end edit



/**
* GET_CONTENT_DATA
* Render tool body or 'content_data'
* @param instance self
* @return HTMLElement content_data
*/
const get_content_data = async function(self) {

	const fragment = new DocumentFragment()

	// components container
		const components_container = ui.create_dom_element({
			element_type	: 'div',
			class_name 		: 'components_container',
			parent 			: fragment
		})

	// source component
		const main_component_container = ui.create_dom_element({
			element_type	: 'div',
			class_name		: 'main_component_container',
			parent			: components_container
		})
		self.main_element.render()
		.then(function(component_node){
			main_component_container.appendChild(component_node)
		})

	// buttons container
		ui.create_dom_element({
			element_type	: 'div',
			class_name		: 'buttons_container',
			parent			: components_container
		})

	// content_data
		const content_data = ui.tool.build_content_data(self);
		content_data.appendChild(fragment);

	return content_data;
        
};