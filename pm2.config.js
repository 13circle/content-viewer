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
			user: "ubuntu",
			host: "3.128.164.186",
			repo: "git@github.com:13circle/content-viewer.git",
			ref: "origin/main",
			ssh_options: "StrictHostKeyChecking=no",
			path: "/home/ubuntu/deploy",
			"post-deploy": "yarn && pm2 reload pm2.config.js",
		},
	},
};
