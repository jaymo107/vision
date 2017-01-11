<?php
namespace App;
use Illuminate\Database\Eloquent\Model;

/**
 * App\Like
 *
 * @author James Davies <jaymo107@gmail.com>
 * @link http://jamesdavies.me
 * @created 29/11/2016 5:46 PM
 * @class Likes
 * @property string $user_id
 * @property string $programme_id
 * @method static \Illuminate\Database\Query\Builder|\App\Like whereUserId($value)
 * @method static \Illuminate\Database\Query\Builder|\App\Like whereProgrammeId($value)
 * @mixin \Eloquent
 */
class Like extends Model
{
    protected $table = 'likes';

    public $timestamps = false;

    protected $fillable = ['user_id', 'programme_id'];

}