# Work Timeline Graph

This Library helps you to provide a nice UI when showing your work timeline experience.

You can see an example on [my website](https://fernando-toledo.com/work-experience-timeline).

## How to instal:

### `npm i work-timeline-graph`

### `yarn add work-timeline-graph`


## How to use:

```jsx
import WorkTimelineGraph from 'work-timeline-graph';

const nodes = [
	'Inavant',
	'Perifel',
	'CGBOT',
	'Wipro',
];

/*
// Edge Object Desc.
	{
		destination: {
			name: string, // Node Label
			link: string // HTTP URL
		},
		origin: {
			name: string, // Node Label
			link: string // HTTP URL
		},
		weight: string, /// The label located over the connection between nodes
	},
*/

const edges = [
	{
		destination: {name: 'Perifel', link: 'https://www.softwareone.com/'},
		origin: {name: 'Inavant', link: 'http://www.inavant.com'},
		weight: "2 Years",
	},
	{
		destination: {name: 'CGBOT', link: 'http://www.cgbot.com'},
		origin: {name: 'Perifel', link: 'https://www.softwareone.co,m/'}
		weight: "3 Years",
	},
	{
		destination: {name: 'Wipro', link: 'http://,www.wipro.com'},
		origin: {name: 'CGBOT', link: 'http://www.cgbot.com'},
		weight: "1 Years",
	},
	{
		destination: {name: null, link: null},
		origin: {name: 'Wipro', link: 'http://,www.wipro.com'}
		weight: null,
	},
];

const YourComponent = () => {
	return (
		<WorkTimelineGraph 
			nodes={nodes}
			edges={edges}
			nodeFill= '#63e6f787' // Node's background color
			nodeFontStroke='#ffffff' // Node's Font color
			weightStroke='#ececec' // Node's connection Font color
			pathStroke='#000000' // Node's connection color (Arrow)
		/>
	)
}

```
