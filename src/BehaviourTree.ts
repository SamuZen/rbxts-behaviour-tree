import { Blackboard } from "./Blackboard";
import { NodeStatus } from "./NodeStatus";
import { Condition } from "./Nodes/Condition";

export class BehaviourTree {
	root: Node;
	blackboard: Blackboard;

	constructor(root: Node, blackboard: Blackboard) {
		this.root = root;
		this.blackboard = blackboard;
	}

	tick() {
		this.root.tick(this.blackboard);
	}
}

export abstract class Node {
	status: NodeStatus = NodeStatus.FAILURE;
	conditions: Condition[] = [];
	_blackboard: Blackboard = new Blackboard();

	abstract tick(blackboard: Blackboard): void;

	addCondition(condition: Condition) {
		this.conditions.push(condition);
		return this;
	}

	passConditios(blackboard: Blackboard) {
		for (const condition of this.conditions) {
			condition.tick(blackboard);
			if (condition.status === NodeStatus.FAILURE) {
				return false;
			}
		}
		return true;
	}
}
