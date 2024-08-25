import { addAliases } from 'module-alias';

addAliases({
	'@domain': __dirname + '/src/1_domain',
	'@application': __dirname + '/src/2_application',
	'@infra': __dirname + '/src/3_infra',
	'@presentation': __dirname + '/src/4_presentation',
	'@main': __dirname + '/src/5_main',
	'@root': __dirname,
});
