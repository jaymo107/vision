<?php
namespace App;
use Illuminate\Database\Eloquent\Model;

/**
 * @author James Davies <jaymo107@gmail.com>
 * @link http://jamesdavies.me
 * @created 29/11/2016 5:46 PM
 * @class Likes
 */
class Dislike extends Model
{
    protected $table = 'dislikes';

    public $timestamps = false;

    protected $fillable = ['user_id', 'programme_id'];

}