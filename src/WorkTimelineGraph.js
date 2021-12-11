import PropTypes from 'prop-types';
import React from 'react';
import * as d3 from 'd3';
import dagreD3 from 'dagre-d3';
import './WorkTimelineGraph.css';

class WorkTimelineComponent extends React.Component {

	constructor(props) {
		super(props);
		const { nodes, edges, nodeFontStroke, nodeFill } = props;
		this.svgContainer = React.createRef();
		this.ge = React.createRef();
		this.createGraph.bind(this);
		this.containerdiv = React.createRef();
		this.nodes = nodes;
		this.edges = edges;
		this.nodeFontStroke = nodeFontStroke;
		this.nodeFill = nodeFill;
	}

	static get propTypes() {
		return {
			nodes: PropTypes.array,
			edges: PropTypes.array,
			nodeFontStroke: PropTypes.string,
			nodeFill: PropTypes.string,
		};
	}

	componentDidMount() {
		this.createGraph(this.nodes, this.edges);
	}


	createGraph(nodes, routes) {

		let g = new dagreD3.graphlib.Graph({ directed: true })
			.setGraph({
				nodesep: 90,
				ranksep: 140,
				rankdir: 'LR',
				marginx: 250,
				marginy: 220
			}).setDefaultEdgeLabel(() => ({}));

		nodes.forEach(node => {
			g.setNode(node,
				{
					label: node,
					class: `${node}-nodert`,
				});
		});

		g.nodes().forEach((v) => {
			var node = g.node(v);
			// Round the corners of the nodes
			node.height = 40;
			node.padding = 10;
			node.class = 'node ' + node.label;
			node.rx = node.ry = 5;
		});

		routes.forEach((route) => {
			if (route.destination.name === null) {
				return;
			}
			let svg_edge_label = document.createElementNS('http://www.w3.org/2000/svg', 'text');
			let edge_tspan = document.createElementNS('http://www.w3.org/2000/svg', 'tspan');
			edge_tspan.setAttributeNS('http://www.w3.org/XML/1998/namespace', 'xml:space', 'preserve');
			edge_tspan.setAttribute('dy', '1em');
			edge_tspan.setAttribute('x', '1');
			edge_tspan.textContent = route.weight;
			svg_edge_label.appendChild(edge_tspan);
			g.setEdge(route.origin.name, route.destination.name, { labelType: 'svg', label: svg_edge_label });

		});

		const svg = d3.select(this.svgContainer.current)
			.append('svg')
			.attr('width', '100%')
			.attr('height', '100%')
			.call(d3.zoom().on('zoom', (e) => {
				svg.attr('transform', e.transform);
			}))
			.insert('g').attr('class', 'g-container');

		const render = new dagreD3.render();

		render(svg, g);

		this.addLinksToNodes(svg, routes);

		this.setBackground(svg);

		const { height: gHeight, width: gWidth } = g.graph();
		const elem = d3.select(this.svgContainer.current);
		const width = elem.node().offsetWidth;
		const height = elem.node().offsetHeight;
		const transX = width - gWidth;
		const transY = height - gHeight;
		svg.attr('viewBox', `0 0 ${width} ${height}`);
		const transformX = transX / 2;
		const transformY = transY / 2;
		d3.select('.output').attr('transform', d3.zoomIdentity.translate(transformX, transformY));


	}

	getEdgeTspan() {
		const edge_tspan = document.createElementNS('http://www.w3.org/2000/svg', 'tspan');
		edge_tspan.setAttributeNS('http://www.w3.org/XML/1998/namespace', 'xml:space', 'preserve');
		edge_tspan.setAttribute('dy', '1em');
		edge_tspan.setAttribute('x', '1');
		return edge_tspan;
	}

	getEdgeLink(routeOrigin, routeDestination, content) {
		const edge_link = document.createElementNS('http://www.w3.org/2000/svg', 'a');
		if (routeOrigin && routeOrigin.origin.link) {
			edge_link.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', routeOrigin.origin.link);
		} else if (routeDestination && routeDestination.origin.link) {
			edge_link.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', routeDestination.destination.link);
		}
		edge_link.setAttribute('target', '_blank');
		edge_link.textContent = content;
		edge_link.style.stroke = this.nodeFontStroke;
		return edge_link;
	}

	setBackground(svg) {

		const rect = svg.selectAll('.node rect');

		rect.nodes().forEach(el => {

			el.style.fill = this.nodeFill;

		});

	}

	addLinksToNodes(svg, routes) {

		const text = svg.selectAll('.node text');

		text.nodes().forEach(el => {
			const content = el.textContent;
			const routeOrigin = routes.find((node) => node.origin.name === content);
			const routeDestination = routes.find((node) => node.destination.name === content);
			el.innerHTML = '';
			let edge_tspan = this.getEdgeTspan();
			let edge_link = this.getEdgeLink(routeOrigin, routeDestination, content);
			edge_tspan.appendChild(edge_link);
			el.appendChild(edge_tspan);
		});
	}

	render() {
		return (
			<div className="container" ref={this.svgContainer} >
			</div>
		);
	}
}

const WorkTimelineGraph = ({ nodes, edges, nodeFontStroke, nodeFill }) => {
	return <WorkTimelineComponent
		nodes={nodes}
		edges={edges}
		nodeFontStroke={nodeFontStroke}
		nodeFill={nodeFill}
	/>;
};

WorkTimelineGraph.propTypes = {
	edges: PropTypes.array,
	nodes: PropTypes.array,
	nodeFontStroke: PropTypes.string,
	nodeFill: PropTypes.string,
};

export default WorkTimelineGraph;