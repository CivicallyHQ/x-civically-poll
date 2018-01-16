# name: civically-poll-extension
# about: Adds additional functionality to the Polls plugin
# version: 0.1
# authors: Angus McLeod
# url: https://github.com/civicallyhq/x-civically-poll

after_initialize do
  module PollExtension
    def vote(post_id, poll_name, options, user)
      post = Post.find(post_id)

      if !user.place_category_id
        raise StandardError.new I18n.t("poll.cant_vote_until_member_of_place")
      end

      if user.place_category_id != post.topic.category.id &&
        user.place_category_id != post.topic.category.parent_category.id
        raise StandardError.new I18n.t("poll.cant_vote_in_foreign_places")
      end

      super
    end
  end

  class DiscoursePoll::Poll
    class << self
      prepend PollExtension
    end
  end
end
