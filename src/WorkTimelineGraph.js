import PropTypes from 'prop-types';
import React from 'react';
import * as d3 from 'd3';
import dagreD3 from 'dagre-d3';
import './WorkTimelineGraph.css';
import { WTLElementHandler } from './shared/WTLElementHandler';

class WorkTimelineComponent extends React.Component {

	constructor(props) {
		super(props);
		const { nodes, edges, nodeFontStroke, nodeFill, weightStroke, pathStroke } = props;
		this.svgContainer = React.createRef();
		this.ge = React.createRef();
		this.createGraph.bind(this);
		this.containerdiv = React.createRef();
		this.nodes = nodes;
		this.edges = edges;
		this.nodeFontStroke = nodeFontStroke;
		this.weightStroke = weightStroke;
		this.pathStroke = pathStroke;

		this.nodeFill = nodeFill;
	}

	static get propTypes() {
		return {
			nodes: PropTypes.array,
			edges: PropTypes.array,
			nodeFontStroke: PropTypes.string,
			nodeFill: PropTypes.string,
			weightStroke: PropTypes.string,
			pathStroke: PropTypes.string,
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
			let edge_tspan = WTLElementHandler.getEdgeTspan();
			edge_tspan.textContent = route.weight;
			edge_tspan.style.stroke = this.weightStroke ? this.weightStroke : '';
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

		WTLElementHandler.addLinksToNodes(svg, routes, this.nodeFontStroke);

		WTLElementHandler.setBackground(svg, this.nodeFill);

		WTLElementHandler.setEdgePathStroke(svg, this.pathStroke);

		WTLElementHandler.translateOutput(svg, d3, g, this.svgContainer.current);

	}

	render() {
		return (
			<div className="container" ref={this.svgContainer} >
			</div>
		);
	}
}

const WorkTimelineGraph = ({
	nodes,
	edges,
	nodeFontStroke,
	nodeFill,
	weightStroke,
	pathStroke
}) => {
	return <WorkTimelineComponent
		nodes={nodes}
		edges={edges}
		nodeFontStroke={nodeFontStroke}
		nodeFill={nodeFill}
		weightStroke={weightStroke}
		pathStroke={pathStroke}
	/>;
};

WorkTimelineGraph.propTypes = {
	edges: PropTypes.array,
	nodes: PropTypes.array,
	nodeFontStroke: PropTypes.string,
	nodeFill: PropTypes.string,
	weightStroke: PropTypes.string,
	pathStroke: PropTypes.string,
};

export default WorkTimelineGraph;