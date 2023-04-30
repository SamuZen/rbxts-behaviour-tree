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

export abstract class MemoryNode extends Node {
	runningIndex = 0;
	memoryDuration = 1;
	lastTick = 0;

	setMemoryDuration(duration: number) {
		this.memoryDuration = duration;
		return this;
	}

	memoryTick() {
		const t = os.time();
		if (t > this.lastTick + this.memoryDuration) {
			this.runningIndex = 0;
		}
		this.lastTick = t;
	}
}
