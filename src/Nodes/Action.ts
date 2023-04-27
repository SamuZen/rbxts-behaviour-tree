import { Node } from "../BehaviourTree";
import { Blackboard } from "../Blackboard";
import { NodeStatus } from "../NodeStatus";

export class Action extends Node {
	action: (blackboard: Blackboard) => NodeStatus | void;

	constructor(action: (blackboard: Blackboard) => NodeStatus | void) {
		super();
		this.action = action;
	}

	tick(blackboard: Blackboard) {
		const actionResult = this.action(blackboard);
		if (actionResult === undefined) {
			this.status = NodeStatus.SUCCESS;
		} else {
			this.status = actionResult;
		}
	}
}
