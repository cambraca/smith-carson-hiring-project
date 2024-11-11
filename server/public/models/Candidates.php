<?php

namespace App\Models;

use Phalcon\Mvc\Model;
use Phalcon\Messages\Message;
use Phalcon\Validation;
use Phalcon\Validation\Validator\Uniqueness;

class Candidates extends Model
{
    public function validation()
    {
        $validator = new Validation();

        $validator->setFilters('name', 'trim');

        $validator->add(
            'name',
            new Uniqueness(
                [
                    'field'   => 'name',
                    'message' => 'The candidate name must be unique',
                ]
            )
        );

        if ($this->age < 18) {
            $this->appendMessage(
                new Message('Candidate must be adult')
            );
            return false;
        }

        // Validate the validator
        return $this->validate($validator);
    }
}
