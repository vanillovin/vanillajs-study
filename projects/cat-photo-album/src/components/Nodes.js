export default function Nodes({ $app, initialState, onClick, onBackClick }) {
  this.state = initialState;
  this.onClick = onClick;
  this.onBackClick = onBackClick;
  this.$target = document.createElement('div');
  this.$target.className = 'nodes';
  $app.append(this.$target);

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    this.$target.innerHTML = `
      ${
        !this.state.isRoot
          ? `<div class="node"><img src="./assets/prev.png" /></div>`
          : ''
      }
		  ${this.state.nodes
        ?.map(
          (node) => `
		        <div class="node" data-node-id="${node.id}">
			        <img src="./assets/${node.type.toLowerCase()}.png"/>
			        <div>${node.name}</div>
		        </div>
          `
        )
        .join('')}
    `;
  };

  this.$target.addEventListener('click', (e) => {
    const { nodeId } = e.target.closest('.Node').dataset;
    if (!nodeId) this.onBackClick();
    const selectedNode = this.state.nodes.find((node) => node.id === nodeId);
    if (selectedNode) this.onClick(selectedNode);
  });

  this.render();
}
