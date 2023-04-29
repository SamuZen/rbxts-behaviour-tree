import { Node } from "../BehaviourTree";
import { Blackboard } from "../Blackboard";
import { NodeStatus } from "../NodeStatus";

export class Sequence extends Node {
	children: Node[] = [];

	addChild(child: Node): Sequence {
		this.children.push(child);
		return this;
	}

	tick(blackboard: Blackboard) {
		if (!this.passConditios(blackboard)) {
			this.status = NodeStatus.FAILURE;
			return;
		}

		for (const child of this.children) {
			child.tick(blackboard);
			if (child.status === NodeStatus.FAILURE) {
				this.status = NodeStatus.FAILURE;
				return;
			} else if (child.status === NodeStatus.RUNNING) {
				this.status = NodeStatus.RUNNING;
				return;
			}
		}
		this.status = NodeStatus.SUCCESS;
	}
}
