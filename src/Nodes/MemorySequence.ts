import { MemoryNode, Node } from "../BehaviourTree";
import { Blackboard } from "../Blackboard";
import { NodeStatus } from "../NodeStatus";

export class MemorySequence extends MemoryNode {
	children: Node[] = [];
	childrenCount = 0;
	runningIndex = 0;

	addChild(child: Node): MemorySequence {
		this.children.push(child);
		this.childrenCount += 1;
		return this;
	}

	tick(blackboard: Blackboard) {
		this.memoryTick();

		if (!this.passConditios(blackboard)) {
			this.status = NodeStatus.FAILURE;
			this.runningIndex = 0;
			return;
		}

		for (let i = this.runningIndex; i < this.childrenCount; i++) {
			const child = this.children[i];
			child.tick(blackboard);
			if (child.status === NodeStatus.FAILURE) {
				this.status = NodeStatus.FAILURE;
				this.runningIndex = 0;
				return;
			} else if (child.status === NodeStatus.RUNNING) {
				this.runningIndex = i;
				this.status = NodeStatus.RUNNING;
				return;
			}
		}
		this.runningIndex = 0;
		this.status = NodeStatus.SUCCESS;
	}
}
