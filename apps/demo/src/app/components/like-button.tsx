import { useContext, useState } from 'react';
import {
  likeArticle,
  unlikeArticle,
  dislikeArticle,
  undislikeArticle,
} from '../services/article.service';
import { Article } from '../models/article.model';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../auth/auth.context';

interface Props {
  article: Article;
}

export default function likeButton({ article }: Props) {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [status, setStatus] = useState<'liked' | 'disliked' | undefined>(
    article.liked ? 'liked' : article.disliked ? 'disliked' : undefined,
  );

  const [likedCount, setLikedCount] = useState(article.likedCount ?? 0);
  const [dislikeCount, setDislikeCount] = useState(article.dislikeCount ?? 0);
  const [isLoading, setIsLoading] = useState(false);

  async function onLikeArticle(): Promise<void> {
    if (!user) {
      navigate('/register');
    }

    setIsLoading(true);

    if (status === 'liked') {
      setStatus(undefined);
      setLikedCount(article.likedCount);
      setDislikeCount(article.dislikeCount);
      await unlikeArticle(article.slug);
    } else {
      setStatus('liked');
      setLikedCount(article.likedCount + 1);
      setDislikeCount(article.dislikeCount);
      await likeArticle(article.slug);
    }

    setIsLoading(false);
  }

  async function onDislikeArticle(): Promise<void> {
    if (!user) {
      navigate('/register');
    }

    setIsLoading(true);

    if (status === 'disliked') {
      setStatus(undefined);
      setLikedCount(article.likedCount);
      setDislikeCount(article.dislikeCount);
      await undislikeArticle(article.slug);
    } else {
      setStatus('disliked');
      setLikedCount(article.likedCount);
      setDislikeCount(article.dislikeCount + 1);
      await dislikeArticle(article.slug);
    }

    setIsLoading(false);
  }

  return (
    <div style={{ display: 'flex' }}>
      <button
        className={`btn btn-sm btn-${status === 'liked' ? '' : 'outline-'}primary pull-xs-right m-x-1`}
        onClick={onLikeArticle}
        disabled={isLoading}
      >
        <i className="m-r-1 ion-thumbsup" />
        {likedCount}
      </button>
      <button
        className={`btn btn-sm btn-${status === 'disliked' ? '' : 'outline-'}primary pull-xs-right`}
        onClick={onDislikeArticle}
        disabled={isLoading}
      >
        <i className="m-r-1 ion-thumbsdown" />
        {dislikeCount}
      </button>
    </div>
  );
}
