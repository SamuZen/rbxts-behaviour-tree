import { Node } from "../BehaviourTree";
import { Blackboard } from "../Blackboard";
import { NodeStatus } from "../NodeStatus";

export class MemorySelector extends Node {
	children: Node[] = [];
	childrenCount = 0;
	runningChild = 0;

	addChild(child: Node) {
		this.children.push(child);
		this.childrenCount += 1;
	}

	tick(blackboard: Blackboard) {
		for (let i = this.runningChild; i < this.childrenCount; i++) {
			const child = this.children[i];
			child.tick(blackboard);
			if (child.status === NodeStatus.SUCCESS) {
				this.runningChild = 0;
				this.status = NodeStatus.SUCCESS;
				return;
			} else if (child.status === NodeStatus.RUNNING) {
				this.runningChild = i;
				this.status = NodeStatus.RUNNING;
				return;
			}
		}
		this.runningChild = 0;
		this.status = NodeStatus.FAILURE;
	}
}
