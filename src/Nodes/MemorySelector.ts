import { Node } from "../BehaviourTree";
import { Blackboard } from "../Blackboard";
import { NodeStatus } from "../NodeStatus";

export class MemorySelector extends Node {
	children: Node[] = [];
	childrenCount = 0;
	runningIndex = 0;

	addChild(child: Node) {
		this.children.push(child);
		this.childrenCount += 1;
	}

	tick(blackboard: Blackboard) {
		if (!this.passConditios(blackboard)) {
			this.status = NodeStatus.FAILURE;
			this.runningIndex = 0;
			return;
		}

		for (let i = this.runningIndex; i < this.childrenCount; i++) {
			const child = this.children[i];
			child.tick(blackboard);
			if (child.status === NodeStatus.SUCCESS) {
				this.runningIndex = 0;
				this.status = NodeStatus.SUCCESS;
				return;
			} else if (child.status === NodeStatus.RUNNING) {
				this.runningIndex = i;
				this.status = NodeStatus.RUNNING;
				return;
			}
		}
		this.runningIndex = 0;
		this.status = NodeStatus.FAILURE;
	}
}
