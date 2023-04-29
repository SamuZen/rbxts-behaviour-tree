import { Node } from "../BehaviourTree";
import { Blackboard } from "../Blackboard";
import { NodeStatus } from "../NodeStatus";
import { Selector } from "./Selector";
import { Sequence } from "./Sequence";

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

	//Helper constructor for creating a response to a condition
	case(value: boolean, action: Action) {
		if (value) {
			return new Sequence().addChild(this).addChild(action);
		} else {
			return new Selector().addChild(this).addChild(action);
		}
	}
}
