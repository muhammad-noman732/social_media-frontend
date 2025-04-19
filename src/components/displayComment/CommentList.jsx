import { useSelector } from "react-redux";

const CommentList = () => {
  const { currentPost, loading, error } = useSelector((state) => state.posts);

  if (loading) return <p>Loading comments...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  if (!currentPost?.comments?.length) {
    return <p className="text-gray-500">No comments yet. Be the first to comment!</p>;
  }

  return (
    <div className="mt-4">
      {currentPost.comments.map((comment) => (
        <div key={comment._id} className="border-b py-2">
          <div className="flex items-center gap-2 mb-1">
            <img
              src={comment.author?.profilePicture}
              alt="profile"
              className="w-6 h-6 rounded-full"
            />
            <span className="text-sm font-semibold">{comment.author?.userName}</span>
          </div>
          <p className="ml-8 text-gray-700">{comment.text}</p>
        </div>
      ))}
    </div>
  );
};

export default CommentList;
