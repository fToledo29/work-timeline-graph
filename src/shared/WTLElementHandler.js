import { WTLHelper } from './WTLHelper';

export class WTLElementHandler extends WTLHelper {

	static getEdgeTspan() {
		const edge_tspan = document.createElementNS('http://www.w3.org/2000/svg', 'tspan');
		edge_tspan.setAttributeNS('http://www.w3.org/XML/1998/namespace', 'xml:space', 'preserve');
		edge_tspan.setAttribute('dy', '1em');
		edge_tspan.setAttribute('x', '1');
		return edge_tspan;
	}

	static getEdgeLink(routeOrigin, routeDestination, content, nodeFontStroke) {
		const edge_link = document.createElementNS('http://www.w3.org/2000/svg', 'a');
		if (routeOrigin && routeOrigin.origin.link) {

			if (this.isValidLink(routeOrigin.origin.link)) {
				WTLHelper.showInvalidLinkWarning();
				return edge_link;
			}
			
			const href = this.getOnlyLinks(routeOrigin.origin.link);

			edge_link.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', href);

		} else if (routeDestination && routeDestination.origin.link) {

			if (this.isValidLink(routeDestination.destination.link)) {
				WTLHelper.showInvalidLinkWarning();
				return edge_link;
			}
			
			const href = this.getOnlyLinks(routeDestination.destination.link);

			edge_link.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', href);
		}
		edge_link.setAttribute('target', '_blank');
		edge_link.textContent = content;
		edge_link.style.stroke = nodeFontStroke;
		return edge_link;
	}

	static translateOutput(svg, d3, g, container) {
		const { height: gHeight, width: gWidth } = g.graph();
		const elem = d3.select(container);
		const width = elem.node().offsetWidth;
		const height = elem.node().offsetHeight;
		const transX = width - gWidth;
		const transY = height - gHeight;
		svg.attr('viewBox', `0 0 ${width} ${height}`);
		const transformX = transX / 2;
		const transformY = transY / 2;
		d3.select('.output').attr(
			'transform', 
			d3.zoomIdentity.translate(
				transformX, 
				transformY
			)
		);

	}

	static 	addLinksToNodes(svg, routes, nodeFontStroke) {

		const text = svg.selectAll('.node text');

		text.nodes().forEach(el => {
			const content = el.textContent;
			const routeOrigin = routes.find((node) => node.origin.name === content);
			const routeDestination = routes.find((node) => node.destination.name === content);
			el.innerHTML = '';
			let edge_tspan = this.getEdgeTspan();
			let edge_link = this.getEdgeLink(routeOrigin, routeDestination, content, nodeFontStroke);
			edge_tspan.appendChild(edge_link);
			el.appendChild(edge_tspan);
		});
	}

}