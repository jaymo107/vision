<?php
namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Query\Builder;

/**
 * App\Programme
 *
 * @author James Davies <jaymo107@gmail.com>
 * @link http://jamesdavies.me
 * @created 29/11/2016 5:46 PM
 * @class Programme
 * @property string $programme_id
 * @property string $imdb_id
 * @property string $type
 * @property boolean $series
 * @property string $genres
 * @property string $actors
 * @property string $poster
 * @property string $rated
 * @property string $rating
 * @property string $writers
 * @property string $director
 * @property \Carbon\Carbon $created_at
 * @property \Carbon\Carbon $updated_at
 * @method static Builder|\App\Programme whereProgrammeId($value)
 * @method static Builder|\App\Programme whereImdbId($value)
 * @method static Builder|\App\Programme whereType($value)
 * @method static Builder|\App\Programme whereSeries($value)
 * @method static Builder|\App\Programme whereGenres($value)
 * @method static Builder|\App\Programme whereActors($value)
 * @method static Builder|\App\Programme wherePoster($value)
 * @method static Builder|\App\Programme whereRated($value)
 * @method static Builder|\App\Programme whereRating($value)
 * @method static Builder|\App\Programme whereWriters($value)
 * @method static Builder|\App\Programme whereDirector($value)
 * @method static Builder|\App\Programme whereCreatedAt($value)
 * @method static Builder|\App\Programme whereUpdatedAt($value)
 * @mixin \Eloquent
 */
class Programme extends Model
{
    protected $table = "programmes";
    protected $primaryKey = "programme_id";
    public $incrementing = false;
    protected $fillable = ['programme_id', 'imdb_id', 'type', 'series', 'genres', 'actors', 'poster', 'rated',
        'rating', 'writers', 'director', 'image', 'programme_name'];
    protected $appends = ['likes', 'dislikes'];

    public function getLikes()
    {
        return Like::whereProgrammeId($this->programme_id)->count();
        // Return the amount of likes for this programme
    }

    public function getDislikes()
    {
        // Return the amount of dislikes for this programme
        return Dislike::whereProgrammeId($this->programme_id)->count();
    }

    public function getLikesAttribute()
    {
        return $this->getLikes();
    }

    public function getDislikesAttribute()
    {
        return $this->getDislikes();
    }
}