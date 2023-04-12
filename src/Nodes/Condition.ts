import { Node } from "../BehaviourTree";
import { Blackboard } from "../Blackboard";
import { NodeStatus } from "../NodeStatus";

export class Condition extends Node {
	condition: (blackboard: Blackboard) => boolean;

	constructor(condition: (blackboard: Blackboard) => boolean) {
		super();
		this.condition = condition;
	}

	tick(blackboard: Blackboard) {
		if (this.condition(blackboard)) {
			this.status = NodeStatus.SUCCESS;
		} else {
			this.status = NodeStatus.FAILURE;
		}
	}
}
