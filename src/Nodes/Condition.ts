import { Node } from "../BehaviourTree";
import { Blackboard } from "../Blackboard";
import { NodeStatus } from "../NodeStatus";
import { Action } from "./Action";
import { Selector } from "./Selector";
import { Sequence } from "./Sequence";

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

	//Helper constructor for creating a response to a condition
	case(value: boolean, action: Action) {
		if (value) {
			return new Sequence().addChild(this).addChild(action);
		} else {
			return new Selector().addChild(this).addChild(action);
		}
	}
}
