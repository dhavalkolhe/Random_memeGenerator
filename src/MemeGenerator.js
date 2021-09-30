import React, { Component } from 'react';

class MemeGenerator extends React.Component {

    constructor() {
        super()
        this.state = {
            randomImg: "https://pics.me.me/thumb_emoticon-meme-face-image-memes-at-relatably-com-50999479.png",
            topText: "",
            bottomText: "",
            allMemeImgs: [],
            showText: false,
            
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }


    componentDidMount() {
        this.setState({isLoading: true})
        fetch("https://api.imgflip.com/get_memes")
            .then(response => response.json())
            .then(response => {
                const {memes} = response.data
                this.setState({
                    allMemeImgs: memes,
                       
                })
                
            })
    }

    handleChange(event) {
        const {name, value} = event.target
        this.setState({ [name]: value })
    }

    handleSubmit(event){
        event.preventDefault()

        const rndmNum = Math.floor(Math.random() * this.state.allMemeImgs.length)
        const rndmMemeImg = this.state.allMemeImgs[rndmNum].url



        this.setState({
            randomImg:rndmMemeImg,
            showText: true
        })



    }

    render() {
        const display = {
            display: "none"
        }
        return(
            
            <main>
                <div className="left">
                    <div className="wrapper">
                        <img src={this.state.randomImg} alt="logo"/>
                        <p className="top" style={this.state.showText ? null: display}>{this.state.topText}</p>
                        <p className="bottom" style={this.state.showText ? null: display}>{this.state.bottomText}</p>
                    </div>
                </div>

                <div className="right">
                    <form className="meme-form" onSubmit={this.handleSubmit}>
                        <input 
                            type="text"
                            name="topText"
                            placeholder="Top Text"
                            value={this.state.topText}
                            onChange={this.handleChange}
                        /> 
                        <input 
                            type="text"
                            name="bottomText"
                            placeholder="Bottom Text"
                            value={this.state.bottomText}
                            onChange={this.handleChange}
                        /> 
                    
                        <button>Gen</button>
                    </form>
                </div>

            </main>
        )
    }
}


export default MemeGenerator