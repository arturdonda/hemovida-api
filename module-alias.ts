import { addAliases } from 'module-alias';

addAliases({
	'@domain': __dirname + '/src/1-domain',
	'@application': __dirname + '/src/2-application',
	'@infra': __dirname + '/src/3-infra',
	'@presentation': __dirname + '/src/4-presentation',
	'@main': __dirname + '/src/5-main',
	'@root': __dirname,
});
