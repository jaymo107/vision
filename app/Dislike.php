<?php
namespace App;
use Illuminate\Database\Eloquent\Model;

/**
 * App\Dislike
 *
 * @author James Davies <jaymo107@gmail.com>
 * @link http://jamesdavies.me
 * @created 29/11/2016 5:46 PM
 * @class Likes
 * @property string $user_id
 * @property string $programme_id
 * @method static \Illuminate\Database\Query\Builder|\App\Dislike whereUserId($value)
 * @method static \Illuminate\Database\Query\Builder|\App\Dislike whereProgrammeId($value)
 * @mixin \Eloquent
 */
class Dislike extends Model
{
    protected $table = 'dislikes';

    public $timestamps = false;

    protected $fillable = ['user_id', 'programme_id'];

}