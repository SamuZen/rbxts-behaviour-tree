import { Blackboard } from "./Blackboard";
import { NodeStatus } from "./NodeStatus";

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

	abstract tick(blackboard: Blackboard): void;
}