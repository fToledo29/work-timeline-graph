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
		<WorkTimelineGraph nodes={nodes} edges={edges} />
	)
}

```
