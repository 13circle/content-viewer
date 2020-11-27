module.exports = {
	apps: [
		{
			name: "contentViewer",
			script: "./bin/www",
			instances: 0,
			exec_mode: "cluster",
			log: "logs/contentViewer.log",
			merge_logs: true,
			time: true,
		},
	],
};
