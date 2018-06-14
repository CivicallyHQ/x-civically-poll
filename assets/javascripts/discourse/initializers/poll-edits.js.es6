import { withPluginApi } from 'discourse/lib/plugin-api';
import { iconNode } from 'discourse-common/lib/icon-library';
import RawHtml from 'discourse/widgets/raw-html';

function optionHtml(option) {
  return new RawHtml({ html: `<span>${option.html}</span>` });
}

export default {
  name: 'poll-edits',
  initialize() {
    withPluginApi('0.8.12', api => {
      api.reopenWidget('discourse-poll-option', {
        html(attrs) {
          const result = [];

          const { option, vote } = attrs;
          const chosen = vote.indexOf(option.id) !== -1;
          const user = this.currentUser;
          const post = this.parentWidget.attrs.post;
          const categoryId = post.topic.category.id;

          if (user && post &&
              user.town_category_id &&
              (user.neighbourhood_category_id === categoryId ||
               user.town_category_id === categoryId ||
               user.town.parent_category_id === categoryId)) {

            if (attrs.isMultiple) {
              result.push(iconNode(chosen ? 'check-square-o' : 'square-o'));
            } else {
              result.push(iconNode(chosen ? 'dot-circle-o' : 'circle-o'));
            }

            result.push(' ');
          }
          
          result.push(optionHtml(option));

          return result;
        },
      });
    });
  }
};
