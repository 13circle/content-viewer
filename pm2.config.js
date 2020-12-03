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

	deploy: {
		staging: {
			user: "root",
			host: "3.128.164.186:5252",
			repo: "git@github.com:13circle/content-viewer.git",
			ref: "origin/main",
			path: "/home/ubuntu/deploy",
			"post-deploy": "yarn && pm2 reload pm2.config.js",
		},
	},
};
