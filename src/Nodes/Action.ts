import { Node } from "../BehaviourTree";
import { Blackboard } from "../Blackboard";
import { NodeStatus } from "../NodeStatus";

export class Action extends Node {
	action: (blackboard: Blackboard) => void;

	constructor(action: (blackboard: Blackboard) => void) {
		super();
		this.action = action;
	}

	tick(blackboard: Blackboard) {
		this.action(blackboard);
		this.status = NodeStatus.SUCCESS;
	}
}
