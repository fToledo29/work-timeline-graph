import { WTLConstans } from "./WTLConstants";

export class WTLHelper {

	static isValidLink(link = '') {
		const [h, t, t2 , p ] = link.toLowerCase().split('');
		return ([h, t, t2 , p].join('') !== WTLConstans.validations.HTTP);
	}

	static 	getOnlyLinks(link = '') {
		return link.toLowerCase().replace(new RegExp(WTLConstans.validations.JAVASCRIPT), '');
	}

	static setEdgePathStroke(svg, pathStroke = '') {

		const paths = svg.selectAll('.edgePaths path');

		paths.nodes().forEach(el => {

			el.style.stroke = pathStroke;

		});
	}

	static 	setBackground(svg, nodeFill = '') {

		const rect = svg.selectAll('.node rect');

		rect.nodes().forEach(el => {

			el.style.fill = nodeFill;

		});

	}

	static showInvalidLinkWarning() {
		console.warn(WTLConstans.messages.INVALID_LINK);
	}
}