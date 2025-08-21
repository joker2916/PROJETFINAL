import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import '../styles/LogIn.css'

export default function VerfEmail() {
    return (
        <div className="container">
            <div className="left_content">
                <span>Vérifiez votre mail</span>
                <p>Ecrivez le code qui vous a été envoyé par mail pour pouvoir rénitialiser votre mot de passe</p>

                <form>
                    <div className="input_item">
                        <input
                            type="text"
                            name="valid-code"
                            id="valid-code"
                            placeholder='Code validation'
                            required
                            autoComplete="no"
                        />
                    </div>

                    <button type='Submit'>Valider</button>

                </form>
            </div>

            <div className="right_content">
                <div className="bg"></div>
            </div>
        </div>
    )
}