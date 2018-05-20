import * as types from '../constants/ControlActionTypes'
import axios from 'axios'


export const getAdminControls = () => {
  return dispatcher => {
      axios.get('/api/control/')
        .then((controls) => {
            let {data} = controls

            let admin = [
              {
                name:"swimsuit",
                category: "Swimsuit",
                status: data.swimsuit
              },
              {
                name:"interview",
                category: "Interview",
                status: data.interview
              },
              {
                name:"talent",
                category: "Talent",
                status: data.talent
              },
              {
                name:"gown",
                category: "Evening Gown",
                status: data.gown
              },
              {
                name:"production",
                category: "Production",
                status: data.production
              },
              {
                name:"f_interview",
                category: "Interview (FINAL ROUND)",
                status: data.f_interview
              },
              {
                name:"f_poise",
                category: "Poise & Charm (FINAL ROUND)",
                status: data.f_poise
              },
            ]
            dispatcher({
              type: types.CONTROLS_ADMIN_SUCCESS,
              data:admin
            })
        })
  }
}


export const getCoronationControls = () =>{
  return dispatcher =>{
    axios.get('/api/control/coronation')
      .then((coronation)=>{
        let {data} = coronation
        dispatcher({
          type: types.CONTROLS_CORONATION_SUCCESS,
          data
        })
      })
  }
}

export const getProductionControls = () =>{
  return dispatcher =>{
    axios.get('/api/control/production')
      .then((production)=>{
        let {data} = production
        dispatcher({
          type: types.CONTROLS_PRODUCTION_SUCCESS,
          data
        })
      })
  }
}

export const getTalentControls = () =>{
  return dispatcher =>{
    axios.get('/api/control/talent')
      .then((talent)=>{
        let {data} = talent
        dispatcher({
          type: types.CONTROLS_TALENT_SUCCESS,
          data
        })
      })
  }
}

export const getFinalControls = () =>{
  return dispatcher =>{
    axios.get('/api/control/final')
      .then((final)=>{
        let {data} = final
        dispatcher({
          type: types.CONTROLS_FINAL_SUCCESS,
          data
        })
      })
  }
}

export const activateAdmin = (category) =>{
  return dispatcher =>{
    axios.put('/api/control/activateAdmin',{
      category:category
    }).then(()=>{
      dispatcher(getAdminControls())
    })
  }
}

export const activeJudge = (category,judgeNo,tab) =>{
  return dispatcher =>{

    axios.put('/api/control/confirmJudge',{
      category:category,
      judgeNo: judgeNo
    }).then(()=>{
      if(tab === "Talent"){
        dispatcher(getTalentControls())
      }else if(tab === "Production"){
        dispatcher(getProductionControls())
      }else if(tab === "Coronation"){
        dispatcher(getCoronationControls())
      }else if(tab === "FinalRound"){
        dispatcher(getFinalControls())
      }
    })
  }
}

export const perJudgeControls = (judgeNo) =>{
  return dispatcher =>{
    axios.get('/api/control/'+judgeNo)
      .then(control=>{
         let {data} = control

         let perjudge = data
         let coronation = [
          {
            name: "swimsuit",
            category: "Swimsuit",
            status: perjudge["swimsuit"]
          },
          {
            name: "gown",
            category: "Evening Gown",
            status: perjudge["gown"]
          },
          {
            name: "interview",
            category: "Interview",
            status: perjudge["interview"]
          }
        ]
    
        let production = [
          {
            name: "production",
            category: "Production",
            status: perjudge["production"]
          }
        ]
    
        let talent = [
          {
            name: "talent",
            category: "Talent",
            status: perjudge["talent"]
          }
        ]
    
        let final = [
          {
            name: "f_interview",
            category: "Interview",
            status: perjudge["f_interview"]
          },
          {
            name: "f_poise",
            category: "Poise & Charm",
            status: perjudge["f_poise"]
          }
        ]

        var judgeControl={
          production: production,
          talent: talent,
          coronation: coronation,
          final: final
        }

         dispatcher({
           type: types.CONTROLS_JUDGE_SUCCESS,
           data: judgeControl
         })
      }).catch(err=>{
        console.log(err.message)
      })
  }
}

export const perJudgeActivate = (category,judgeNo) =>{
  return dispatcher =>{

    axios.put('/api/control/confirmJudge',{
      category:category,
      judgeNo: judgeNo
    }).then(()=>{
        dispatcher(perJudgeControls(judgeNo))
    })
  }
}