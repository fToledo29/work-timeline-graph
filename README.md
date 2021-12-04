# Work Timeline Graph

This Library helps you to provide a nice UI when showing your work timeline experience.

You can see an example on [my website](https://fernando-toledo.com/work-experience-timeline).

## How to instal:

### `npm i work-timeline-graph`

### `yarn add work-timeline-graph`


## How to use:

`import WorkTimelineGraph from 'work-timeline-graph';`

`const nodes = [`
`	'Inavant',`
`	'Perifel',`
`	'CGBOT',`
`	'Farm Credit Bank Of Texas',`
`	'Tiempo Development',`
`	'CSG',`
`	'Vixxo',`
`	'GreenByte',`
`	'Delta Airlines',`
`	'Wipro',`
`	'Alight Solutions',`
`	'The Bank of New York Mellon'`
`];`

`const edges = [`
`	{`
`		destination: {name: 'Perifel', link: 'https://www.softwareone.com/'},`
`		origin: {name: 'Inavant', link: 'http://www.inavant.com'},`
`		weight: "2 Years",`
`	},`
`	{`
`		destination: {name: 'CGBOT', link: 'http://www.cgbot.com'},`
`		origin: {name: 'Perifel', link: 'https://www.softwareone.co,m/'}`
`		weight: "3 Years",`
`	},`
`	{`
`		destination: {name: 'Tiempo Development', link: 'http://www.tiempodev.com'},`
`		origin: {name: 'CGBOT', link: 'http://www.cgbot.com'},`
`		weight: "1 Years",`
`	},`
`	{`
`		destination: {name: 'Farm Credit Bank Of Texas', link: 'https://www.farmcreditbank.com/'},`
`		origin: {name: 'CGBOT', link: 'http://www.cgbot.com'},`
`		weight: "1 Years 6 Months",`
`	},`
`	{`
`		destination: {name: 'GreenByte', link: 'http://www.greenbyteit.com'},`
`		origin: {name: 'Tiempo Development', link: 'http://www.tiempodev.com',}`
`		weight: "1 Years",`
`	},`
`	{`
`		destination: {name: 'CSG', link: 'https://www.csgi.com/'},`
`		origin: {name: 'Tiempo Development', link: 'http://www.tie,mpodev.com'}`
`		weight: "4 Months",`
`	},`
`	{`
`		destination: {name: 'Vixxo', link: 'https://www.vixxo.com/'},`
`		origin: {name: 'CSG', link: 'https://www.csgi.com/'},`
`		weight: "10 Months",`
`	},`
`	{`
`		destination: {name: 'Wipro', link: 'http://www.wipro.com'},`
`		origin: {name: 'GreenByte', link: 'http://www.greenbyteit.c,om'}`
`		weight: "1 Years",`
`	},`
`	{`
`		destination: {name: 'Delta Airlines', link: 'https://www.delta.com/'},`
`		origin: {name: 'GreenByte', link: 'http://www.greenbyteit.com'},`
`		weight: "1 Years 2 Months",`
`	},`
`	{`
`		destination: {name: null, link: null},`
`		origin: {name: 'Wipro', link: 'http://,www.wipro.com'}`
`		weight: null,`
`	},`
`	{:`
`		destination: {name: 'Alight Solutions', link: 'https://alight.com/'},`
`		origin: {name: 'Wipro', link: 'http://www.wipro.com'},`
`		weight: "4 Months",`
`	},`
`	{:`
`		destination: {name: 'The Bank of New York Mellon', link: 'https://www.bnymellon.com/'},`
`		origin: {name: 'Alight Solutions', link: 'https://alight.com/'},`
`		weight: "1 Years 8 Months",`
`	}`
`];`

`const YourComponent = () => {`
`	return (`
`		<WorkTimelineGraph nodes={nodes} edges={edges} />`
`	)`
`}`
