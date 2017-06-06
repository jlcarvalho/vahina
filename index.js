'use strict';

const isCondition = obj => !!obj.condition;

/**
	Executes a workflow using the given instance and workflow rules

	@param {Mixed} instance instance to run through the rule engine
	@param {Array} flow Flow through which to run the instance
 */
const run = exports.run = async function (instance, flow) {
	const res = await flow.condition.call(instance, instance, flow);

	const branch = flow.branch[res];

	if (isCondition(branch)) {
		return await run(instance, branch);
	} else {
		return ('function' !== typeof branch ? branch : await branch.call(instance, instance, flow));
	}
}
