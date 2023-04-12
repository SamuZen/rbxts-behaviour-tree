import { Node } from "../BehaviourTree";
import { Blackboard } from "../Blackboard";
import { NodeStatus } from "../NodeStatus";

export class Condition extends Node {
	condition: () => boolean;

	constructor(condition: () => boolean) {
		super();
		this.condition = condition;
	}

	tick() {
		if (this.condition()) {
			this.status = NodeStatus.SUCCESS;
		} else {
			this.status = NodeStatus.FAILURE;
		}
	}
}
