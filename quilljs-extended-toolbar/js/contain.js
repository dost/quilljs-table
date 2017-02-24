let Container = Quill.import('blots/container');
let Inline = Quill.import('blots/inline');
let Block = Quill.import('blots/block');
let Delta = Quill.import('delta');
let Parchment = Quill.import('parchment');
let BlockEmbed = Quill.import('blots/block/embed');
let TextBlot = Quill.import('blots/text');

//
//
// CONTAINER TAG
//

class ContainBlot extends Container {
  static create(value) {
    let tagName = 'contain';
    let node = super.create(tagName);
    return node;
  }

  static formats(domNode) {
    return domNode.tagName;
  }

  insertBefore(blot, ref) {
    console.log('run....');
      console.log(blot);
    if (blot instanceof TextBlot) {
      super.insertBefore(blot.parent, ref);
    } else if (blot instanceof ContainBlot) {
      let index = ref == null ? this.length() : ref.offset(this);
      let after = this.split(index);
      console.log(after)
    } else {
      let index = ref == null ? this.length() : ref.offset(this);
      let after = this.split(index);
      blot.parent = after
      console.log(after)
      super.insertBefore(blot, ref);
    }
  }

  format(name, value) {
    if (this.children.length > 0) {
      this.children.tail.format(name, value);
    }
  }

  formats() {
    // We don't inherit from FormatBlot
    return { [this.statics.blotName]: this.statics.formats(this.domNode) }
  }

  replace(target) {
    if (target.statics.blotName !== this.statics.blotName) {
      let item = Parchment.create(this.statics.defaultChild);
      target.moveChildren(item);
      this.appendChild(item);
    }
    super.replace(target);
  }
}

ContainBlot.blotName = 'contain';
ContainBlot.tagName = 'contain';
ContainBlot.scope = Parchment.Scope.BLOCK_BLOT;
ContainBlot.defaultChild = 'block';
ContainBlot.allowedChildren = [Block, BlockEmbed, Container];

Quill.register(ContainBlot);
Quill.debug('debug');

